using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using hrisApi.Services.JobApplicationService.DTO;

namespace hrisApi.Services.JobApplicationService
{
    public interface IJobApplicationAppService : IAsyncCrudAppService<JobApplicationDto, Guid>
    {
        
    }
    
}
