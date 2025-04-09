using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using hrisApi.Domains.Employee_Management;

namespace hrisApi.Domains.Attendance_Management
{
    public class LeaveRequest : FullAuditedEntity<Guid>
    {
        [ForeignKey("EmployeeId")]
        public Employee Employee { get; set; }
        public Guid EmployeeId { get; set; }
        public string LeaveType { get; set; } //Vacation, Sickpublic DateTime StartDate 
        public DateTime EndDate { get; set; } 
        public string Status { get; set; } // Pending, Approved, Rejectedpublic string Reason

    }
}
