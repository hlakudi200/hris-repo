using Abp.Application.Services;
using hrisApi.Domains.Payroll_Processing;
using hrisApi.Services.PayrollTransactionService.DTO;
using hrisApi.Services.PayrollTransactionService;
using System;
using hrisApi.Services.ProjectService.DTO;
using hrisApi.Domains.Attendance_Management;
using Abp.Domain.Repositories;
using System.Threading.Tasks;

namespace hrisApi.Services.ProjectService
{
    public class ProjectAppService : AsyncCrudAppService<Project, ProjectDto, Guid>, IProjectAppService
    {
        public ProjectAppService(IRepository<Project, Guid> repository) : base(repository)
        {
        }

        public override Task<ProjectDto> CreateAsync(ProjectDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task<ProjectDto> UpdateAsync(ProjectDto input)
        {
            return base.UpdateAsync(input);
        }
    }
}
