using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Domains.Recruitment_Module;
using hrisApi.Services.JobApplicationService.DTO;

namespace hrisApi.Services.JobPostingService.DTO
{
    [AutoMap(typeof(JobPosting))]
    public class JobPostingDto : EntityDto<Guid>
    {
        public string Title { get; set; }
        public string Department { get; set; }
        public string Description { get; set; }
        public DateTime OpenDate { get; set; }
        public DateTime? CloseDate { get; set; }
        public ICollection<JobApplicationDto> JobApplications { get; set; } = new List<JobApplicationDto>();
    }
}
