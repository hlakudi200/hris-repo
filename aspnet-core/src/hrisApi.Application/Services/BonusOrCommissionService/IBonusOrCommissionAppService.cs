using System;
using Abp.Application.Services;
using hrisApi.Services.BonusOrCommissionService.DTO;

namespace hrisApi.Services.BonusOrCommissionService
{
    public interface IBonusOrCommissionAppService : IAsyncCrudAppService<BonusOrCommisionDto, Guid>
    {
    }
}
