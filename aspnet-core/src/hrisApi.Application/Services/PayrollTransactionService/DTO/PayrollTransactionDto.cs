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

        public decimal TaxAmount { get; set; } = 0.0m;
        public decimal NetAmount { get; set; } = 0.0m;
        public bool IsPaid { get; set; }

        public string TransactionDate { get; set; }

    }
}
