using System;
using System.Collections.Generic;
using Abp.AutoMapper;
using hrisApi.Domains.Payroll_Processing;

namespace hrisApi.Services.PayrollProfileService.DTO
{
    [AutoMap(typeof(PayrollProfile))]
    public class GetPayrollProfileDto
    {
        public Guid EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeePosition { get; set; }
        public decimal BasicSalary { get; set; }
        public decimal TaxRate { get; } = 15.5m;
        public ICollection<PayrollTransaction> Transactions { get; set; }
    }
}
