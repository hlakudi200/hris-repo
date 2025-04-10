using System;
using System.Collections.Generic;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Domains.Payroll_Processing;

namespace hrisApi.Services.PayrollTransactionService.DTO
{
    [AutoMap(typeof(PayrollTransaction))]
    public class PayrollTransactionDto : EntityDto<Guid>
    {
        public Guid PayrollProfileId { get; set; }
        public DateTime PeriodStart { get; set; }
        public DateTime PeriodEnd { get; set; }
        public decimal GrossAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal NetAmount { get; set; }
        public bool IsPaid { get; set; }
        public ICollection<BonusOrCommission> BonusesAndCommissions { get; set; }
        public ICollection<Reimbursement> Reimbursements { get; set; }
    }
}
