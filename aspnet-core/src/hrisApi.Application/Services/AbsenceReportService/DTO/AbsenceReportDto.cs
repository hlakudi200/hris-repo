using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Domains.Attendance_Management;

namespace hrisApi.Services.AbsenceReportService.DTO
{
    [AutoMap(typeof(AbsenceReport))]
    public class AbsenceReportDto : EntityDto<Guid>
    {
        public Guid EmployeeId { get; set; }
        public DateTime Date { get; set; }
        public string AbsenceType { get; set; }
    }
}
