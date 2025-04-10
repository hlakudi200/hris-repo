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
    public class AttendanceRecord : FullAuditedEntity<Guid>
    {
        public Guid EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public Employee Employee { get; set; }
        public Guid ProjectId { get; set; }
        public DateTime ClockInTime { get; set; }
        public DateTime? ClockOutTime { get; set; }
        public string Note { get; set; }

    }
}
