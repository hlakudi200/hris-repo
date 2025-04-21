export const applicationSubmittedTemplate = (
    name: string,
    jobTitle: string
  ): string => `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #007bff;">📨 Application Received</h2>
      <p>Dear ${name},</p>
      <p>Thank you for applying for the <strong>${jobTitle}</strong> position. We have successfully received your application. 📨</p>
      <p>Our recruitment team will carefully review your submission and assess your qualifications in relation to the role. If your profile matches our requirements, we will contact you to discuss the next steps.</p>
      <br />
      <p>We appreciate your interest in joining our team and wish you the best of luck with your application!</p>
      <br />
      <p>Kind regards,<br/>HR Department</p>
    </div>
  `;
  