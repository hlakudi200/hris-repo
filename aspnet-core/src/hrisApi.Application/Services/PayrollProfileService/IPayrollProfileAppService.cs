using System;
using Abp.Application.Services;
using hrisApi.Services.PayrollProfileService.DTO;

namespace hrisApi.Services.PayrollProfileService
{
    public interface IPayrollProfileAppService : IAsyncCrudAppService<PayrollProfileDto, Guid>
    {
    }
}
