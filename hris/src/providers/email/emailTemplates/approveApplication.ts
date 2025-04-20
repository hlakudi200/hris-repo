export const approveApplicationTemplate = (
    name: string,
    jobTitle: string
  ): string => `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #28a745;">🎉 Congratulations! Job Application Approved</h2>
      <p>Dear ${name},</p>
      <p>We're thrilled to inform you that your application for the <strong>${jobTitle}</strong> position has been <strong>approved</strong>! 🎉</p>
      <p>We were impressed by your qualifications and are excited to move forward with you. Our team will be in touch soon with the next steps, including interview details and scheduling information.</p>
      <br />
      <p>Get ready for this exciting new chapter in your career, and we look forward to speaking with you soon!</p>
      <br />
      <p>Kind regards,<br/>HR Department</p>
    </div>
  `;
  