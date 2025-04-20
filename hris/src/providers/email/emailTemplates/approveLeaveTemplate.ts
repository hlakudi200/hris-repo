export const approveLeaveTemplate = (
    name: string,
    leaveType: string,
    startDate: string,
    endDate: string
  ): string => `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #28a745;">🎉 Leave Request Approved</h2>
      <p>Dear ${name},</p>
      <p>We are pleased to inform you that your <strong>${leaveType}</strong> leave request from <strong>${startDate}</strong> to <strong>${endDate}</strong> has been <strong>approved</strong>.</p>
      <p>Please make sure to keep your team updated and coordinate accordingly.</p>
      <br />
      <p>Kind regards,<br/>HR Department</p>
    </div>
  `;
  