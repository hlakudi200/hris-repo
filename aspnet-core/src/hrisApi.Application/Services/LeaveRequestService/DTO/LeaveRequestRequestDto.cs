using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Domains.Attendance_Management;
using hrisApi.Services.Employee_Management.DTO;

namespace hrisApi.Services.LeaveRequestService.DTO
{
    [AutoMap(typeof(LeaveRequest))]
    public class LeaveRequestRequestDto : EntityDto<Guid>
    {
        public Guid EmployeeId { get; set; }
        public string LeaveType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; }
        public string Reason { get; set; }

    }
}
