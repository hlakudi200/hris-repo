export const submitApplicationTemplate = (
    name: string,
    jobTitle: string
  ): string => `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #28a745;">✅ Application Submitted</h2>
      <p>Dear ${name},</p>
      <p>Thank you for applying for the <strong>${jobTitle}</strong> position. We have received your application and our team will carefully review it.</p>
      <p>If your profile matches our requirements, we will contact you to discuss the next steps in the hiring process.</p>
      <br />
      <p>We appreciate your interest in joining our team and wish you the best of luck!</p>
      <br />
      <p>Kind regards,<br/>HR Department</p>
    </div>
  `;
  