using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Domains.Payroll_Processing;

namespace hrisApi.Services.BonusOrCommissionService.DTO
{
    [AutoMap(typeof(BonusOrCommission))]
    public class BonusOrCommisionDto : EntityDto<Guid>
    {
        public Guid PayrollTransactionId { get; set; }
        public string Type { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
    }
}
