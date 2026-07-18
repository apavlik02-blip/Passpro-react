import { serve } from "https://deno.land/x/sift@0.6.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.0";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function sendReminders() {
  const { data: users, error } = await supabase
    .from("study_streaks")
    .select("user_id, streak_end_date")
    .lt("streak_end_date", new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()); // 2 days before expiration

  if (error) {
    console.error("Error fetching streak data:", error);
    return;
  }

  for (const user of users) {
    const { user_id, streak_end_date } = user;

    const { data: email, error: emailError } = await supabase
      .from("auth.users")
      .select("email")
      .eq("id", user_id)
      .single();

    if (emailError) {
      console.error(`Error fetching email for user ${user_id}:`, emailError);
      continue;
    }

    const response = await fetch("https://api.emailservice.com/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("EMAIL_API_KEY")}`,
      },
      body: JSON.stringify({
        to: email.email,
        subject: "Keep Your Study Streak Alive!",
        text: `Hi there! Your study streak is about to expire on ${streak_end_date}. Keep it going by completing a study session today!`,
      }),
    });

    if (!response.ok) {
      console.error(`Failed to send email to ${email.email}:`, await response.text());
    }
  }
}

serve(async (req) => {
  if (req.method === "POST") {
    await sendReminders();
    return new Response("Reminders sent successfully!", { status: 200 });
  }

  return new Response("Method not allowed", { status: 405 });
});
