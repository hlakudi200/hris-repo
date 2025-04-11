using System;
using Abp.Application.Services;
using hrisApi.Services.ProjectService.DTO;

namespace hrisApi.Services.ProjectService
{
    public interface IProjectAppService : IAsyncCrudAppService<ProjectDto, Guid>
    {
    }
}
