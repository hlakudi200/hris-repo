using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using hrisApi.Services.InterviewService.DTO;

namespace hrisApi.Services.InterviewService
{
    public interface IInterviewAppService : IAsyncCrudAppService<InterviewDto, Guid>
    {
        
    }
   
}
