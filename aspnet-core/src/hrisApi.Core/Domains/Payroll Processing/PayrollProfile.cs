using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using hrisApi.Domains.Employee_Management;

namespace hrisApi.Domains.Payroll_Processing
{
    public class PayrollProfile : FullAuditedEntity<Guid>
    {

        public Guid EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public Employee Employee { get; set; }
        public decimal BasicSalary { get; set; }
       
        public decimal TaxRate { get; set; }

        public ICollection<PayrollTransaction> Transactions { get; set; }

    }
}
