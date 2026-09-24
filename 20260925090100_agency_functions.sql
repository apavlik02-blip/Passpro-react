-- Licensed in 30 Days: business logic as SQL functions.
--
-- The `agency` Edge Function verifies the caller's Clerk token and then calls
-- these with the verified user id. Keeping the rules in SQL means they can be
-- tested directly against the database. EXECUTE is revoked from anon and
-- authenticated: only the service role (the Edge Function) may call them.
--
-- Errors are raised as `agency:<code>` so the Edge Function can map them to
-- HTTP responses.

create or replace function public.journey_step_keys()
returns text[] language sql immutable as $$
  select array[
    'prelicensing_enrolled', 'prelicensing_complete', 'exam_scheduled', 'exam_ready',
    'exam_passed', 'fingerprints', 'application_submitted', 'license_issued',
    'appointed', 'first_sale'
  ]
$$;

create or replace function public.license_keys()
returns text[] language sql immutable as $$
  select array['life', 'health', 'property', 'casualty', 'personal_lines']
$$;

-- Owner or manager membership for a user, if any.
create or replace function public.agency_staff_membership(p_user text)
returns public.agency_members language sql stable as $$
  select m.* from public.agency_members m
  where m.user_id = p_user and m.role in ('owner', 'manager')
  order by case m.role when 'owner' then 0 else 1 end
  limit 1
$$;

create or replace function public.agency_submit_lead(
  p_contact_name text, p_email text, p_agency_name text,
  p_phone text default null, p_recruits_per_year text default null, p_message text default null
) returns jsonb language plpgsql as $$
declare v_id uuid;
begin
  if coalesce(trim(p_contact_name), '') = '' or coalesce(trim(p_agency_name), '') = ''
     or p_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' then
    raise exception 'agency:invalid_lead';
  end if;
  insert into public.agency_leads (contact_name, email, agency_name, phone, recruits_per_year, message)
  values (trim(p_contact_name), lower(trim(p_email)), trim(p_agency_name),
          nullif(trim(p_phone), ''), nullif(trim(p_recruits_per_year), ''), nullif(trim(p_message), ''))
  returning id into v_id;
  return jsonb_build_object('ok', true, 'id', v_id);
end $$;

create or replace function public.journey_json(p_user text)
returns jsonb language sql stable as $$
  select case when j.user_id is null then null else jsonb_build_object(
    'license_key', j.license_key,
    'started_at', j.started_at,
    'agency_id', j.agency_id,
    'steps', coalesce((
      select jsonb_object_agg(s.step_key, s.completed_at)
      from public.recruit_steps s where s.user_id = p_user
    ), '{}'::jsonb)
  ) end
  from (select p_user as uid) x
  left join public.recruit_journeys j on j.user_id = x.uid
$$;

create or replace function public.agency_me(p_user text)
returns jsonb language plpgsql stable as $$
declare
  v_staff public.agency_members;
  v_recruit public.agency_members;
  v_agency public.agencies;
begin
  v_staff := public.agency_staff_membership(p_user);
  select * into v_recruit from public.agency_members where user_id = p_user and role = 'recruit';
  if v_staff.agency_id is not null then
    select * into v_agency from public.agencies where id = v_staff.agency_id;
  elsif v_recruit.agency_id is not null then
    select * into v_agency from public.agencies where id = v_recruit.agency_id;
  end if;
  return jsonb_build_object(
    'role', coalesce(v_staff.role, v_recruit.role),
    'agency', case when v_agency.id is null then null else jsonb_build_object(
      'id', v_agency.id, 'name', v_agency.name, 'plan', v_agency.plan,
      'seat_limit', v_agency.seat_limit, 'pilot_ends_at', v_agency.pilot_ends_at) end,
    'journey', public.journey_json(p_user)
  );
end $$;

create or replace function public.agency_create(p_user text, p_name text, p_contact_email text default null)
returns jsonb language plpgsql as $$
declare
  v_id uuid := gen_random_uuid();
  v_code text := 'agency-' || substr(replace(v_id::text, '-', ''), 1, 12);
begin
  if char_length(coalesce(trim(p_name), '')) < 2 then
    raise exception 'agency:invalid_name';
  end if;
  if exists (select 1 from public.agency_members where user_id = p_user) then
    raise exception 'agency:already_member';
  end if;
  insert into public.access_codes (code, note) values (v_code, 'Agency: ' || trim(p_name));
  insert into public.agencies (id, name, owner_user_id, contact_email, plan, seat_limit, pilot_ends_at, agency_access_code)
  values (v_id, trim(p_name), p_user, nullif(trim(p_contact_email), ''), 'pilot', 25, now() + interval '60 days', v_code);
  insert into public.agency_members (agency_id, user_id, role, email)
  values (v_id, p_user, 'owner', nullif(trim(p_contact_email), ''));
  -- Owners can open the study platform to see what recruits see.
  insert into public.user_access (user_id, code) values (p_user, v_code)
  on conflict (user_id) do nothing;
  return public.agency_me(p_user);
end $$;

create or replace function public.agency_seats_used(p_agency uuid)
returns integer language sql stable as $$
  select (select count(*) from public.agency_members where agency_id = p_agency and role = 'recruit')::int
       + (select count(*) from public.agency_invites
          where agency_id = p_agency and accepted_at is null and revoked_at is null and expires_at > now())::int
$$;

create or replace function public.agency_create_invite(
  p_user text, p_license_key text, p_name text default null, p_email text default null
) returns jsonb language plpgsql as $$
declare
  v_staff public.agency_members;
  v_agency public.agencies;
  v_code text;
begin
  v_staff := public.agency_staff_membership(p_user);
  if v_staff.agency_id is null then raise exception 'agency:not_staff'; end if;
  if not (p_license_key = any (public.license_keys())) then raise exception 'agency:invalid_license'; end if;
  select * into v_agency from public.agencies where id = v_staff.agency_id;
  if public.agency_seats_used(v_agency.id) >= v_agency.seat_limit then
    raise exception 'agency:seat_limit';
  end if;
  v_code := substr(md5(random()::text || clock_timestamp()::text || p_user), 1, 10);
  insert into public.agency_invites (code, agency_id, license_key, invitee_name, invitee_email, created_by)
  values (v_code, v_agency.id, p_license_key, nullif(trim(p_name), ''), nullif(lower(trim(p_email)), ''), p_user);
  return jsonb_build_object('code', v_code, 'expires_at', now() + interval '14 days');
end $$;

create or replace function public.agency_revoke_invite(p_user text, p_code text)
returns jsonb language plpgsql as $$
declare v_staff public.agency_members;
begin
  v_staff := public.agency_staff_membership(p_user);
  if v_staff.agency_id is null then raise exception 'agency:not_staff'; end if;
  update public.agency_invites set revoked_at = now()
  where code = p_code and agency_id = v_staff.agency_id and accepted_at is null;
  if not found then raise exception 'agency:invite_not_found'; end if;
  return jsonb_build_object('ok', true);
end $$;

-- Public-safe preview of an invite for the /join page (no auth needed).
create or replace function public.agency_invite_preview(p_code text)
returns jsonb language sql stable as $$
  select case when i.code is null then jsonb_build_object('valid', false)
  else jsonb_build_object(
    'valid', i.accepted_at is null and i.revoked_at is null and i.expires_at > now(),
    'agency_name', a.name, 'license_key', i.license_key, 'invitee_name', i.invitee_name,
    'status', case when i.accepted_at is not null then 'accepted'
                   when i.revoked_at is not null then 'revoked'
                   when i.expires_at <= now() then 'expired' else 'open' end)
  end
  from (select p_code as c) x
  left join public.agency_invites i on i.code = x.c
  left join public.agencies a on a.id = i.agency_id
$$;

create or replace function public.agency_accept_invite(
  p_user text, p_code text, p_display_name text default null, p_email text default null
) returns jsonb language plpgsql as $$
declare
  v_invite public.agency_invites;
  v_agency public.agencies;
begin
  select * into v_invite from public.agency_invites where code = p_code for update;
  if v_invite.code is null or v_invite.revoked_at is not null then raise exception 'agency:invite_not_found'; end if;
  if v_invite.accepted_at is not null then
    if v_invite.accepted_by = p_user then return public.agency_me(p_user); end if;
    raise exception 'agency:invite_used';
  end if;
  if v_invite.expires_at <= now() then raise exception 'agency:invite_expired'; end if;
  if exists (select 1 from public.agency_members where user_id = p_user) then
    raise exception 'agency:already_member';
  end if;
  select * into v_agency from public.agencies where id = v_invite.agency_id;

  insert into public.agency_members (agency_id, user_id, role, display_name, email, license_key)
  values (v_agency.id, p_user, 'recruit',
          coalesce(nullif(trim(p_display_name), ''), v_invite.invitee_name),
          coalesce(nullif(lower(trim(p_email)), ''), v_invite.invitee_email),
          v_invite.license_key);
  update public.agency_invites set accepted_by = p_user, accepted_at = now() where code = p_code;

  -- Sponsored access to the study platform through the agency's access code.
  -- A recruit who already has their own access keeps it untouched.
  insert into public.user_access (user_id, code) values (p_user, v_agency.agency_access_code)
  on conflict (user_id) do nothing;

  insert into public.recruit_journeys (user_id, agency_id, license_key)
  values (p_user, v_agency.id, v_invite.license_key)
  on conflict (user_id) do update set agency_id = excluded.agency_id, updated_at = now();

  return public.agency_me(p_user);
end $$;

create or replace function public.journey_start(p_user text, p_license_key text)
returns jsonb language plpgsql as $$
begin
  if not (p_license_key = any (public.license_keys())) then raise exception 'agency:invalid_license'; end if;
  insert into public.recruit_journeys (user_id, license_key)
  values (p_user, p_license_key)
  on conflict (user_id) do update set license_key = excluded.license_key, updated_at = now();
  return public.agency_me(p_user);
end $$;

-- A recruit updates their own steps; agency staff may update their recruits'.
create or replace function public.journey_set_step(
  p_actor text, p_target text, p_step text, p_done boolean
) returns jsonb language plpgsql as $$
declare v_staff public.agency_members;
begin
  if not (p_step = any (public.journey_step_keys())) then raise exception 'agency:invalid_step'; end if;
  if p_target <> p_actor then
    v_staff := public.agency_staff_membership(p_actor);
    if v_staff.agency_id is null or not exists (
      select 1 from public.agency_members
      where agency_id = v_staff.agency_id and user_id = p_target and role = 'recruit'
    ) then
      raise exception 'agency:not_allowed';
    end if;
  end if;
  if not exists (select 1 from public.recruit_journeys where user_id = p_target) then
    raise exception 'agency:no_journey';
  end if;
  if p_done then
    insert into public.recruit_steps (user_id, step_key, updated_by) values (p_target, p_step, p_actor)
    on conflict (user_id, step_key) do nothing;
  else
    delete from public.recruit_steps where user_id = p_target and step_key = p_step;
  end if;
  update public.recruit_journeys set updated_at = now() where user_id = p_target;
  return public.journey_json(p_target);
end $$;

create or replace function public.agency_dashboard(p_user text)
returns jsonb language plpgsql stable as $$
declare
  v_staff public.agency_members;
  v_agency public.agencies;
begin
  v_staff := public.agency_staff_membership(p_user);
  if v_staff.agency_id is null then raise exception 'agency:not_staff'; end if;
  select * into v_agency from public.agencies where id = v_staff.agency_id;
  return jsonb_build_object(
    'agency', jsonb_build_object(
      'id', v_agency.id, 'name', v_agency.name, 'plan', v_agency.plan,
      'seat_limit', v_agency.seat_limit, 'seats_used', public.agency_seats_used(v_agency.id),
      'pilot_ends_at', v_agency.pilot_ends_at, 'created_at', v_agency.created_at),
    'role', v_staff.role,
    'invites', coalesce((
      select jsonb_agg(jsonb_build_object(
        'code', i.code, 'license_key', i.license_key, 'invitee_name', i.invitee_name,
        'invitee_email', i.invitee_email, 'created_at', i.created_at, 'expires_at', i.expires_at)
        order by i.created_at desc)
      from public.agency_invites i
      where i.agency_id = v_agency.id and i.accepted_at is null and i.revoked_at is null and i.expires_at > now()
    ), '[]'::jsonb),
    'recruits', coalesce((
      select jsonb_agg(jsonb_build_object(
        'user_id', m.user_id,
        'name', m.display_name,
        'email', m.email,
        'license_key', coalesce(j.license_key, m.license_key),
        'joined_at', m.joined_at,
        'started_at', coalesce(j.started_at, m.joined_at),
        'steps', coalesce((select jsonb_object_agg(s.step_key, s.completed_at)
                           from public.recruit_steps s where s.user_id = m.user_id), '{}'::jsonb),
        'readiness', p.current_readiness,
        'last_quiz_score', p.last_quiz_score,
        'quizzes_taken', coalesce(jsonb_array_length(p.quiz_history), 0),
        'study_streak', p.study_streak,
        'cards_reviewed', (select count(*) from public.flashcard_reviews f where f.user_id = m.user_id),
        'last_activity', greatest(
          p.last_study_date::timestamptz, p.updated_at, j.updated_at,
          (select max(f.updated_at) from public.flashcard_reviews f where f.user_id = m.user_id),
          m.joined_at)
      ) order by m.joined_at)
      from public.agency_members m
      left join public.recruit_journeys j on j.user_id = m.user_id
      left join public.aria_progress p on p.user_id = m.user_id
      where m.agency_id = v_agency.id and m.role = 'recruit'
    ), '[]'::jsonb)
  );
end $$;

-- Remove a recruit from the agency and end their sponsored access.
create or replace function public.agency_remove_recruit(p_user text, p_recruit text)
returns jsonb language plpgsql as $$
declare
  v_staff public.agency_members;
  v_agency public.agencies;
begin
  v_staff := public.agency_staff_membership(p_user);
  if v_staff.agency_id is null then raise exception 'agency:not_staff'; end if;
  select * into v_agency from public.agencies where id = v_staff.agency_id;
  delete from public.agency_members
  where agency_id = v_agency.id and user_id = p_recruit and role = 'recruit';
  if not found then raise exception 'agency:not_allowed'; end if;
  delete from public.user_access where user_id = p_recruit and code = v_agency.agency_access_code;
  update public.recruit_journeys set agency_id = null where user_id = p_recruit;
  return jsonb_build_object('ok', true);
end $$;

-- Lock everything down to the service role.
do $$
declare fn text;
begin
  foreach fn in array array[
    'journey_step_keys()', 'license_keys()', 'agency_staff_membership(text)',
    'agency_submit_lead(text,text,text,text,text,text)', 'journey_json(text)', 'agency_me(text)',
    'agency_create(text,text,text)', 'agency_seats_used(uuid)',
    'agency_create_invite(text,text,text,text)', 'agency_revoke_invite(text,text)',
    'agency_invite_preview(text)', 'agency_accept_invite(text,text,text,text)',
    'journey_start(text,text)', 'journey_set_step(text,text,text,boolean)',
    'agency_dashboard(text)', 'agency_remove_recruit(text,text)'
  ] loop
    execute format('revoke all on function public.%s from public, anon, authenticated', fn);
    execute format('grant execute on function public.%s to service_role', fn);
    execute format('alter function public.%s set search_path = public', fn);
  end loop;
end $$;
