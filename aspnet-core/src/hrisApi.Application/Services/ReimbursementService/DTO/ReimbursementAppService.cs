using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using hrisApi.Domains.Payroll_Processing;

namespace hrisApi.Services.ReimbursementService.DTO
{
    public class ReimbursementAppService : AsyncCrudAppService<Reimbursement, ReimbursementDto, Guid>, IReimbursementAppService
    {
        public ReimbursementAppService(IRepository<Reimbursement, Guid> repository) : base(repository)
        {
        }
    }
}
