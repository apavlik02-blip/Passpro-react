-- Remove exact duplicate questions (same domain + question text), keeping the
-- earliest row. ~10 duplicates existed in production as of 2026-07-18.
delete from public.questions
where id in (
  select id from (
    select id,
           row_number() over (
             partition by domain, question
             order by created_at, id
           ) as rn
    from public.questions
  ) ranked
  where ranked.rn > 1
);
