using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using hrisApi.Domains.Employee_Management;

namespace hrisApi.Domains.Attendance_Management
{
    public class Leave : FullAuditedEntity<Guid>
    {
        public Guid EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public Employee Employee { get; set; }
        public int Annual { get; set; }
        public int Sick { get; set; }
        public int Study { get; set; }
        public int FamilyResponsibility { get; set; }
    }
}
