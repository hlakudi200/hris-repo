using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using hrisApi.Domains.Recruitment_Module;
using hrisApi.Services.JobApplicationService.DTO;
using Microsoft.EntityFrameworkCore;

namespace hrisApi.Services.JobApplicationService
{
    public class JobApplicationAppService : AsyncCrudAppService<JobApplication, JobApplicationDto, Guid>, IJobApplicationAppService
    {
        public JobApplicationAppService(IRepository<JobApplication, Guid> repository) : base(repository)
        {
        }

        public async Task<List<JobApplicationDto>> GetAllJobApplicationsById(Guid applicantId)
        {
            var query = await Repository.GetAllAsync();
            var JobApplications = await query.Include(x => x.JobPosting).Where(x => x.ApplicantId == applicantId).ToListAsync();

            var results = ObjectMapper.Map<List<JobApplicationDto>>(JobApplications);

            return results;

        }

    }

}
