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
        public Guid Id { get; set; }
        public string JobTitle { get; set; }
        public string JobDescription { get; set; }
        public string Location { get; set; }
        public DateTime PostingDate { get; set; }
        public DateTime ClosingDate { get; set; }
        public string Status { get; set; }
        public ICollection<JobApplicationDto> JobApplications { get; set; } = new List<JobApplicationDto>();
    }
}
