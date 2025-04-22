using System;
using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using hrisApi.Domains.Payroll_Processing;
using hrisApi.Services.BonusOrCommissionService.DTO;

namespace hrisApi.Services.BonusOrCommissionService
{
    [AbpAuthorize]
    public class BonusOrCommissionAppService : AsyncCrudAppService<BonusOrCommission, BonusOrCommisionDto, Guid>, IBonusOrCommissionAppService
    {
        public BonusOrCommissionAppService(IRepository<BonusOrCommission, Guid> repository) : base(repository)
        {
        }
    }
}
