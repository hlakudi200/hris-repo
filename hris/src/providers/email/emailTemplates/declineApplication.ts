export const declineApplicationTemplate = (
    name: string,
    jobTitle: string,
    reason?: string
  ): string => `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #dc3545;">⚠️ Job Application Status</h2>
      <p>Dear ${name},</p>
      <p>Thank you for your interest in the <strong>${jobTitle}</strong> position. Unfortunately, after careful consideration, we regret to inform you that we will not be proceeding with your application at this time.</p>
      ${
        reason
          ? `<p><strong>Reason:</strong> ${reason}</p>`
          : "<p>We truly appreciate your effort and encourage you to apply again for future openings that match your skills. Please feel free to reach out if you'd like feedback or more details about your application.</p>"
      }
      <br />
      <p>We wish you the best of luck in your future career endeavors and thank you once again for your time and interest.</p>
      <br />
      <p>Kind regards,<br/>HR Department</p>
    </div>
  `;
  