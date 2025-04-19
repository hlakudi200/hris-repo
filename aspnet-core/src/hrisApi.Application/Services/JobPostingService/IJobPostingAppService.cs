using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using hrisApi.Services.JobPostingService.DTO;
using hrisApi.Services.PayrollProfileService.DTO;

namespace hrisApi.Services.JobPostingService
{
    public interface IJobPostingAppService : IAsyncCrudAppService<JobPostingDto, Guid>
    {
        public Task<List<JobPostingDto>> GetAllInclude();
    }

}
