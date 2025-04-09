using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using hrisApi.Domains.Employee_Management;

namespace hrisApi.Domains.Attendance_Management
{
    public class AbsenceReport
    {
        [ForeignKey("EmployeeId")]
        public Employee Employee { get; set; }
        public Guid EmployeeId { get; set; }
        public DateTime Date { get; set; }
        public string AbsenceType { get; set; } 
    }

}

