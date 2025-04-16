using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using hrisApi.Domains.Recruitment_Module;
using hrisApi.Services.InterviewService.DTO;

namespace hrisApi.Services.InterviewService
{
    public class InterviewAppService : AsyncCrudAppService<Interview, InterviewDto, Guid>, IInterviewAppService
    {
        public InterviewAppService(IRepository<Interview, Guid> repository) : base(repository)
        {
        }

        public async Task<IList<InterviewDto>> GetInterviewsByJobApplication(Guid id)
        {
            var interviews = await Repository.GetAllListAsync(x => x.JobApplicationId == id);

            return ObjectMapper.Map<IList<InterviewDto>>(interviews);
        }


    }
   
}
