﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace hrisApi.Domains.Payroll_Processing
{
    public class PayrollTransaction : FullAuditedEntity<Guid>
    {
        public Guid PayrollProfileId { get; set; }

        [ForeignKey(nameof(PayrollProfileId))]
        public PayrollProfile PayrollProfile { get; set; }
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
