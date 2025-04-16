using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using hrisApi.Domains.Payroll_Processing;

namespace hrisApi.Services.PayrollProfileService.DTO
{

    public class NamedPayrollProfileDto
    {
        public Guid EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeePosition { get; set; }
        public decimal BasicSalary { get; set; }
        public decimal TaxRate { get; } = 15.5m;
        public ICollection<PayrollTransaction> Transactions { get; set; }
    }
}
