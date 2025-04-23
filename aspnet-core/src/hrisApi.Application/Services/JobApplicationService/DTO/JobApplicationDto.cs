using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Domains.Attendance_Management;
using hrisApi.Domains.Recruitment_Module;
using hrisApi.Services.JobPostingService.DTO;

namespace hrisApi.Services.JobApplicationService.DTO
{
    [AutoMap(typeof(JobApplication))]
    public class JobApplicationDto : EntityDto<Guid>
    {
        public Guid JobPostingId { get; set; }
        public Guid? ApplicantId { get; set; }
        public string ApplicantName { get; set; }
        public string Email { get; set; }
        public string ResumePath { get; set; }
        public string Status { get; set; }
        public ICollection<Interview> Interviews { get; set; }

    }
}
