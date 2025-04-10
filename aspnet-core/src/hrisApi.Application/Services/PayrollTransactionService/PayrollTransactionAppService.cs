using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using hrisApi.Domains.Payroll_Processing;
using hrisApi.Services.PayrollTransactionService.DTO;

namespace hrisApi.Services.PayrollTransactionService
{
    public class PayrollTransactionAppService : AsyncCrudAppService<PayrollTransaction, PayrollTransactionDto, Guid>, IPayrollTransactionAppService
    {
        public PayrollTransactionAppService(IRepository<PayrollTransaction, Guid> repository) : base(repository)
        {
        }
    }
}
