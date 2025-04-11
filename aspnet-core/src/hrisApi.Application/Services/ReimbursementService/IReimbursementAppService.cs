using System;
using Abp.Application.Services;
using hrisApi.Services.ReimbursementService.DTO;

namespace hrisApi.Services.ReimbursementService
{
    public interface IReimbursementAppService : IAsyncCrudAppService<ReimbursementDto, Guid>
    {
    }
}
