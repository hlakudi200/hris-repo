using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using hrisApi.Services.PayrollTransactionService.DTO;

namespace hrisApi.Services.PayrollTransactionService
{
    public interface IPayrollTransactionAppService : IAsyncCrudAppService<PayrollTransactionDto, Guid>
    {
        //Task<byte[]> GeneratePayslipPdfAsync(Guid payrollTransactionId);

        Task<FileDto> GeneratePayrollPdf(Guid id);

        Task<FileDto> DownloadPayrollPdfAsync(Guid id);


    }
}
