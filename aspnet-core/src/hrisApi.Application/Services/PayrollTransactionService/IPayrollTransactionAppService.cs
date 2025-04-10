using System;
using Abp.Application.Services;
using hrisApi.Services.PayrollTransactionService.DTO;

namespace hrisApi.Services.PayrollTransactionService
{
    public interface IPayrollTransactionAppService : IAsyncCrudAppService<PayrollTransactionDto, Guid>
    {
    }
}
