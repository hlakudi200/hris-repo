using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Domains.Attendance_Management;
using hrisApi.Domains.Employee_Management;

namespace hrisApi.Services.ProjectService.DTO
{
    [AutoMap(typeof(Project))]
    public class ProjectDto : EntityDto<Guid>
    {
        public string ProjectCode { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
