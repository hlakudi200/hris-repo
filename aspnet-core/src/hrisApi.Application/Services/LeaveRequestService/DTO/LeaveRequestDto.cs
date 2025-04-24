using System;
using System.Text.Json.Serialization;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Domains.Attendance_Management;
using hrisApi.Domains.Employee_Management;
using hrisApi.Services.Employee_Management.DTO;

namespace hrisApi.Services.LeaveService.DTO
{
    [AutoMap(typeof(LeaveRequest))]
    public class LeaveRequestDto : EntityDto<Guid>
    {
        public Guid EmployeeId { get; set; }

        public EmployeeDto Employee { get; set; }
        public string LeaveType { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Status { get; set; }
        public string Reason { get; set; }
    }
}
