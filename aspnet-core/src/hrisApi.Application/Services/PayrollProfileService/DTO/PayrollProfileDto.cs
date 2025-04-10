using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Domains.Payroll_Processing;

namespace hrisApi.Services.PayrollProfileService.DTO
{
    [AutoMap(typeof(PayrollProfile))]
    public class PayrollProfileDto : EntityDto<Guid>
    {
        public Guid EmployeeId { get; set; }
        public decimal BasicSalary { get; set; }
        public decimal TaxRate { get; set; }
    }
}
