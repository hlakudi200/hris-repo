using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using hrisApi.Domains.Payroll_Processing;
using hrisApi.Services.LeaveService.DTO;
using hrisApi.Services.PayrollProfileService.DTO;
using Microsoft.EntityFrameworkCore;

namespace hrisApi.Services.PayrollProfileService
{
    public class PayrollProfileAppService : AsyncCrudAppService<PayrollProfile, PayrollProfileDto, Guid>, IPayrollProfileAppService
    {
        private readonly IRepository<PayrollProfile, Guid> _repository;
        public PayrollProfileAppService(IRepository<PayrollProfile, Guid> repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task<GetPayrollProfileDto> GetByEmpId(Guid empId)
        {

            var payrollProfile = await _repository.GetAllIncluding(p => p.Employee, p => p.Transactions).FirstOrDefaultAsync(p => p.EmployeeId == empId);


            return payrollProfile != null ? ObjectMapper.Map<GetPayrollProfileDto>(payrollProfile) : null;
        }

        public async Task<List<GetPayrollProfileDto>> GetAllInclude()
        {

            var payrollProfiles = await _repository.GetAllIncludingAsync(p => p.Employee, p => p.Transactions);

            var result = await payrollProfiles.Select(p => new GetPayrollProfileDto
            {
                EmployeeId = p.EmployeeId,
                BasicSalary = p.BasicSalary,
                EmployeeName = p.Employee.User.Name,
                EmployeePosition = p.Employee.Position,
                Transactions = p.Transactions
            }).ToListAsync();

            return result;
        }

    }
}
