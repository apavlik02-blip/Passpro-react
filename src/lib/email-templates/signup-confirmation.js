// lib/email-templates/signup-confirmation.js
// Plain HTML string templates — no React Email dependency required.
// Swap in your mahogany/copper ARIA brand colors below.

export function signupConfirmationEmail({ firstName = 'there', dashboardUrl = 'https://passpro.company/dashboard' } = {}) {
  const subject = 'Welcome to PassPro — your account is ready';

  const html = `
  <div style="font-family: 'Josefin Sans', Arial, sans-serif; background:#faf8f5; padding:32px;">
    <div style="max-width:480px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #e8e0d8;">
      <div style="background:#4b2e1e; padding:24px 32px;">
        <h1 style="font-family: 'Cormorant Garamond', Georgia, serif; color:#e8b568; margin:0; font-size:28px;">PassPro</h1>
      </div>
      <div style="padding:32px;">
        <h2 style="color:#2a1c14; font-size:20px; margin-top:0;">Welcome, ${firstName}!</h2>
        <p style="color:#4a3a2f; line-height:1.6;">
          Your PassPro account is set up. You're ready to start prepping for your
          Wisconsin Life and Health insurance exam with flashcards, practice exams,
          and ARIA, your AI study companion.
        </p>
        <a href="${dashboardUrl}"
           style="display:inline-block; margin-top:16px; background:#b87333; color:#fff; text-decoration:none; padding:12px 24px; border-radius:6px; font-weight:600;">
          Go to your dashboard
        </a>
        <p style="color:#8a7a6a; font-size:13px; margin-top:32px;">
          Didn't sign up for PassPro? You can safely ignore this email.
        </p>
      </div>
    </div>
  </div>`;

  return { subject, html };
}
