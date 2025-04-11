using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Domains.Attendance_Management;

namespace hrisApi.Services.ProjectService.DTO
{
    [AutoMapTo(typeof(Project))]
    public class ProjectRequestDto : FullAuditedEntityDto<Guid>
    {
        public string ProjectCode { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
