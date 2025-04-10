using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using hrisApi.Domains.Recruitment_Module;
using hrisApi.Services.JobApplicationService.DTO;

namespace hrisApi.Services.JobApplicationService
{
    public class JobApplicationAppService : AsyncCrudAppService<JobApplication, JobApplicationDto, Guid>, IJobApplicationAppService
    {
        public JobApplicationAppService(IRepository<JobApplication, Guid> repository) : base(repository)
        {
        }
    }
   
}
