using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using hrisApi.Domains.Payroll_Processing;
using hrisApi.Domains.Recruitment_Module;
using hrisApi.Services.JobPostingService.DTO;
using hrisApi.Services.PayrollProfileService.DTO;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol.Core.Types;

namespace hrisApi.Services.JobPostingService
{
    public class JobPostingAppService : AsyncCrudAppService<JobPosting, JobPostingDto, Guid>, IJobPostingAppService
    {
        private readonly IRepository<JobPosting, Guid> _repository;
        public JobPostingAppService(IRepository<JobPosting, Guid> repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task<List<JobPostingDto>> GetAllInclude()
        {
            // Load all JobPostings including Applications
            var jobPostings = await _repository
                .GetAllIncluding(p => p.Applications)
                .ToListAsync();

            var result = ObjectMapper.Map<List<JobPostingDto>>(jobPostings);

            return result;
        }
    }

}
