using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.UI;
using hrisApi.Domains.Recruitment_Module;
using hrisApi.Services.EmailService;
using hrisApi.Services.EmailService.DTO;
using hrisApi.Services.InterviewService.DTO;
using hrisApi.Services.JobApplicationService.DTO;
using Microsoft.EntityFrameworkCore;

namespace hrisApi.Services.InterviewService
{
    [AbpAuthorize]
    public class InterviewAppService : AsyncCrudAppService<Interview, InterviewDto, Guid>, IInterviewAppService
    {
        private readonly IRepository<JobApplication, Guid> _jobApplicationRepository;
        private readonly EmailAppService _emailAppService;

        public InterviewAppService(IRepository<Interview, Guid> repository, IRepository<JobApplication, Guid> jobApplicationRepository, EmailAppService emailAppService) : base(repository)
        {
            _jobApplicationRepository = jobApplicationRepository;
            _emailAppService = emailAppService;

        }

        public async Task<JobApplicationDto> GetApplicantDetailsAsync(Guid jobApplicationId)
        {
            var jobApplication = await _jobApplicationRepository.GetAsync(jobApplicationId);
            if (jobApplication == null)
            {
                throw new UserFriendlyException("Job application not found");
            }

            return ObjectMapper.Map<JobApplicationDto>(jobApplication);
        }

        public async Task<IList<InterviewDto>> GetInterviewsByJobApplication(Guid id)
        {
            var interviews = await Repository.GetAllListAsync(x => x.JobApplicationId == id);

            return ObjectMapper.Map<IList<InterviewDto>>(interviews);
        }

        public async Task<List<JobApplicationDto>> GetPendingApplicationsAsync()
        {
            var applications = await _jobApplicationRepository
                 .GetAll()
                 .Where(a => a.Status == "Pending" || a.Status == "Approved")
                 .ToListAsync();

            return ObjectMapper.Map<List<JobApplicationDto>>(applications);
        }

        public async Task<InterviewDto> ScheduleInterviewAsync(InterviewSchedulingDto input)
        {
            // Get applicant details
            var applicant = await _jobApplicationRepository.GetAsync(input.JobApplicationId);
            if (applicant == null)
            {
                throw new UserFriendlyException("Job application not found");
            }

            // Create the interview
            var interview = new Interview
            {
                JobApplicationId = input.JobApplicationId,
                ScheduledDate = input.ScheduledDate,
                Interviewer = input.Interviewer,
                Mode = input.Mode
            };

            // Save the interview
            var interviewId = await Repository.InsertAndGetIdAsync(interview);
            await CurrentUnitOfWork.SaveChangesAsync();

            // Send email notification to the applicant
            await SendInterviewInvitationEmail(
                applicant.Email,
                applicant.ApplicantName,
                input.ScheduledDate,
                input.Interviewer,
                input.Mode,
                input.Location,
                input.AdditionalInformation
            );

            // Return the created interview
            return ObjectMapper.Map<InterviewDto>(interview);
        }

        // Method to send interview invitation email
        private async Task SendInterviewInvitationEmail(
            string applicantEmail,
            string applicantName,
            DateTime scheduledDate,
            string interviewer,
            string mode,
            string location,
            string additionalInfo)
        {
            try
            {
                // Format the date and time
                string formattedDateTime = scheduledDate.ToString("dddd, MMMM dd, yyyy 'at' h:mm tt");

                // Create HTML email body
                string emailBody = $@"
                <html>
                <body style='font-family: Arial, sans-serif; line-height: 1.6;'>
                    <div style='max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;'>
                        <h2 style='color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;'>Interview Invitation</h2>
                        
                        <p>Dear {applicantName},</p>
                        
                        <p>Thank you for your application. We are pleased to invite you for an interview.</p>
                        
                        <div style='background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;'>
                            <p><strong>Date and Time:</strong> {formattedDateTime}</p>
                            <p><strong>Interviewer:</strong> {interviewer}</p>
                            <p><strong>Interview Mode:</strong> {mode}</p>
                            {(string.IsNullOrEmpty(location) ? "" : $"<p><strong>Location/Link:</strong> {location}</p>")}
                        </div>
                        
                        {(string.IsNullOrEmpty(additionalInfo) ? "" : $"<p><strong>Additional Information:</strong><br>{additionalInfo}</p>")}
                        
                        <p>Please confirm your attendance by replying to this email.</p>
                        
                        <p>If you need to reschedule or have any questions, please contact us as soon as possible.</p>
                        
                        <p>Best regards,<br>HR Recruitment Team</p>
                    </div>
                </body>
                </html>";

                // Create email request
                var emailRequest = new EmailRequestDto
                {
                    To = applicantEmail,
                    Subject = "Interview Invitation",
                    Body = emailBody,
                    IsBodyHtml = true
                };

                // Send email
                await _emailAppService.SendEmail(emailRequest);

                Logger.Info($"Interview invitation email sent successfully to: {applicantEmail}");
            }
            catch (Exception ex)
            {
                // Log error but don't fail interview scheduling if email fails
                Logger.Error($"Failed to send interview invitation email: {ex.Message}", ex);
            }
        }

        
    }
}
    


