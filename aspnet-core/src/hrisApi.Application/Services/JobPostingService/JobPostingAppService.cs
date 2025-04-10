using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using hrisApi.Domains.Recruitment_Module;
using hrisApi.Services.JobPostingService.DTO;

namespace hrisApi.Services.JobPostingService
{
    public class JobPostingAppService : AsyncCrudAppService<JobPosting, JobPostingDto, Guid>, IJobPostingAppService
    {
        public JobPostingAppService(IRepository<JobPosting, Guid> repository) : base(repository)
        {
        }
    }
   
}
