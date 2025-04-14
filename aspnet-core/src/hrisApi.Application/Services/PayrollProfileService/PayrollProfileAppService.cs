using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using hrisApi.Domains.Payroll_Processing;
using hrisApi.Services.LeaveService.DTO;
using hrisApi.Services.PayrollProfileService.DTO;

namespace hrisApi.Services.PayrollProfileService
{
    public class PayrollProfileAppService : AsyncCrudAppService<PayrollProfile, PayrollProfileDto, Guid>, IPayrollProfileAppService
    {
        private readonly IRepository<PayrollProfile, Guid> _repository;
        public PayrollProfileAppService(IRepository<PayrollProfile, Guid> repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task<PayrollProfileDto> GetByEmpId(Guid empId)
        {

            var payrollProfile = await _repository.FirstOrDefaultAsync(p => p.EmployeeId == empId);

            return payrollProfile != null ? ObjectMapper.Map<PayrollProfileDto>(payrollProfile) : null;
        }
    }
}
