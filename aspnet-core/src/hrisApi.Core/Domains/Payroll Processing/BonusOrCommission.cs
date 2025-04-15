using System;
using Abp.Domain.Entities.Auditing;

namespace hrisApi.Domains.Payroll_Processing
{
    public class BonusOrCommission : FullAuditedEntity<Guid>
    {
        public Guid PayrollTransactionId { get; set; }
        public string Type { get; set; } // Bonus or Commission
        public decimal Amount { get; set; }
        public string Description { get; set; }
    }
}
