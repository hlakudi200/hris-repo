using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using hrisApi.Domains.Payroll_Processing;
using hrisApi.Services.PayrollProfileService.DTO;

namespace hrisApi.Services.PayrollProfileService
{
    public class PayrollProfileAppService : AsyncCrudAppService<PayrollProfile, PayrollProfileDto, Guid>, IPayrollProfileAppService
    {
        public PayrollProfileAppService(IRepository<PayrollProfile, Guid> repository) : base(repository)
        {
        }
    }
}
