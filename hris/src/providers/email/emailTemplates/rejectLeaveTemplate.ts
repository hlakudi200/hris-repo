export const rejectLeaveTemplate = (
    name: string,
    leaveType: string,
    startDate: string,
    endDate: string,
    reason?: string
  ): string => `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #dc3545;">⚠️ Leave Request Rejected</h2>
      <p>Dear ${name},</p>
      <p>We regret to inform you that your <strong>${leaveType}</strong> leave request from <strong>${startDate}</strong> to <strong>${endDate}</strong> has been <strong>declined</strong>.</p>
      ${
        reason
          ? `<p><strong>Reason:</strong> ${reason}</p>`
          : "<p>Please contact HR for more information.</p>"
      }
      <br />
      <p>Kind regards,<br/>HR Department</p>
    </div>
  `;
  