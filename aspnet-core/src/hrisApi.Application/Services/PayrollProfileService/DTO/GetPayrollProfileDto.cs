using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Domains.Payroll_Processing;

namespace hrisApi.Services.PayrollProfileService.DTO
{
    [AutoMap(typeof(PayrollProfile))]
    public class GetPayrollProfileDto:EntityDto<Guid>
    {
        public Guid EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeePosition { get; set; }
        public decimal BasicSalary { get; set; }
        public decimal TaxRate { get; set; }
        public ICollection<PayrollTransaction> Transactions { get; set; }
    }
}
