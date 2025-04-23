using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using hrisApi.Domains.Payroll_Processing;
using hrisApi.Domains.Recruitment_Module;
using hrisApi.Services.JobApllicantService.DTO;

namespace hrisApi.Services.JobApllicantService
{
    public class JobApplicantAppService : AsyncCrudAppService<JobApplicant, JobApplicantDto, Guid>, IJobApplicantAppSerice
    {
        private readonly IRepository<JobApplicant, Guid> _repository;
        public JobApplicantAppService(IRepository<JobApplicant, Guid> repository) : base(repository)
        {
            _repository = repository;
        }
        public async Task<JobApplicantDto> GetJobApplicantById(long UserId)
        {
            var query = await _repository.FirstOrDefaultAsync(p => p.UserId == UserId);

            var jobApplicant = ObjectMapper.Map<JobApplicantDto>(query);

            return jobApplicant;
        }
    }
}
