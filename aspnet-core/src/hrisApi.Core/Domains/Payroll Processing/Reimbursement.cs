using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;

namespace hrisApi.Domains.Payroll_Processing
{
    public class Reimbursement : FullAuditedEntity<Guid>
    {
       
        public Guid PayrollTransactionId { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }

    }
}
