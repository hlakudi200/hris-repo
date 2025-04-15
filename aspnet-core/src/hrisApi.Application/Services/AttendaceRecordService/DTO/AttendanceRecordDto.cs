using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Domains.Attendance_Management;

namespace hrisApi.Services.AttendaceRecordService.DTO
{
    [AutoMap(typeof(AttendanceRecord))]
    public class AttendanceRecordDto : EntityDto<Guid>
    {
        public Guid EmployeeId { get; set; }
        public Guid ProjectId { get; set; }
        public DateTime ClockInTime { get; set; }
        public DateTime? ClockOutTime { get; set; }
        public string YearMonthWeek { get; set; }
        public string Note { get; set; }
    }
}
