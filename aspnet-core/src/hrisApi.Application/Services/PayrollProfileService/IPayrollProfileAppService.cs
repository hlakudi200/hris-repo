using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using hrisApi.Services.PayrollProfileService.DTO;

namespace hrisApi.Services.PayrollProfileService
{
    public interface IPayrollProfileAppService : IAsyncCrudAppService<PayrollProfileDto, Guid>
    {
        public Task<PayrollProfileDto> GetByEmpId(Guid empId);
        public Task<List<NamedPayrollProfileDto>> GetAllNamed();
    }
}
