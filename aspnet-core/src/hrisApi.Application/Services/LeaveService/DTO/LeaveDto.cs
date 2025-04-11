using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Domains.Attendance_Management;

namespace hrisApi.Services.LeaveService.DTO
{
    [AutoMap(typeof(Leave))]
    public class LeaveDto : EntityDto<Guid>
    {
        public Guid EmployeeId { get; set; }
        public int Annual { get; set; }
        public int Sick { get; set; }
        public int Study { get; set; }
        public int FamilyResponsibility { get; set; }
    }
}
