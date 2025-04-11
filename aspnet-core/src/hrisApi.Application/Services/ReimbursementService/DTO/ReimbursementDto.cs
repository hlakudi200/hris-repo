using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Domains.Payroll_Processing;

namespace hrisApi.Services.ReimbursementService.DTO
{
    [AutoMap(typeof(Reimbursement))]
    public class ReimbursementDto : EntityDto<Guid>
    {
        public Guid PayrollTransactionId { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
    }
}
