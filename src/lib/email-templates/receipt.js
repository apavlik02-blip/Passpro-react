// lib/email-templates/receipt.js

export function receiptEmail({
  firstName = 'there',
  planName = 'PassPro Plan',
  amount = '0.00',
  currency = 'USD',
  invoiceUrl = '',
  date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
} = {}) {
  const subject = `Your PassPro receipt — ${date}`;

  const html = `
  <div style="font-family: 'Josefin Sans', Arial, sans-serif; background:#faf8f5; padding:32px;">
    <div style="max-width:480px; margin:0 auto; background:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #e8e0d8;">
      <div style="background:#4b2e1e; padding:24px 32px;">
        <h1 style="font-family: 'Cormorant Garamond', Georgia, serif; color:#e8b568; margin:0; font-size:28px;">PassPro</h1>
      </div>
      <div style="padding:32px;">
        <h2 style="color:#2a1c14; font-size:20px; margin-top:0;">Thanks, ${firstName}</h2>
        <p style="color:#4a3a2f; line-height:1.6;">Here's your receipt for ${date}.</p>

        <table style="width:100%; margin-top:16px; border-collapse:collapse;">
          <tr>
            <td style="padding:12px 0; border-bottom:1px solid #e8e0d8; color:#4a3a2f;">${planName}</td>
            <td style="padding:12px 0; border-bottom:1px solid #e8e0d8; color:#2a1c14; text-align:right; font-weight:600;">
              ${amount} ${currency}
            </td>
          </tr>
        </table>

        ${invoiceUrl ? `
        <a href="${invoiceUrl}"
           style="display:inline-block; margin-top:24px; background:#b87333; color:#fff; text-decoration:none; padding:12px 24px; border-radius:6px; font-weight:600;">
          View invoice
        </a>` : ''}

        <p style="color:#8a7a6a; font-size:13px; margin-top:32px;">
          Questions about this charge? Reply to this email.
        </p>
      </div>
    </div>
  </div>`;

  return { subject, html };
}
