using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using hrisApi.Services.InterviewService.DTO;
using hrisApi.Services.JobApplicationService.DTO;

namespace hrisApi.Services.InterviewService
{
    public interface IInterviewAppService : IAsyncCrudAppService<InterviewDto, Guid>
    {
        Task<IList<InterviewDto>> GetInterviewsByJobApplication(Guid id);
        Task<JobApplicationDto> GetApplicantDetailsAsync(Guid jobApplicationId);
        Task<InterviewDto> ScheduleInterviewAsync(InterviewSchedulingDto input);
        Task<List<JobApplicationDto>> GetPendingApplicationsAsync();

    }
   
}
