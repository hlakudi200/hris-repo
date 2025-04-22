using System;
using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using hrisApi.Domains.Attendance_Management;
using hrisApi.Services.ProjectService.DTO;

namespace hrisApi.Services.ProjectService
{
    [AbpAuthorize]
    public class ProjectAppService : AsyncCrudAppService<Project, ProjectDto, Guid>, IProjectAppService
    {
        public ProjectAppService(IRepository<Project, Guid> repository) : base(repository)
        {
        }

    }
}
