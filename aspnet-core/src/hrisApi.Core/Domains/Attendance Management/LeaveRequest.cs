using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities;
using hrisApi.Domains.Employee_Management;

namespace hrisApi.Domains.Attendance_Management
{
    public class LeaveRequest : Entity<Guid>
    {
        [ForeignKey("EmployeeId")]
        public Employee Employee { get; set; }
        public Guid EmployeeId { get; set; }
        public string LeaveType { get; set; } //Vacation, Sick
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; } // Pending, Approved, Rejected
        public string Reason { get; set; }

    }
}
