using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Domains.Recruitment_Module;

namespace hrisApi.Services.InterviewService.DTO
{
    [AutoMap(typeof(Interview))]
    public class InterviewDto : EntityDto<Guid>
    {
        public Guid JobApplicationId { get; set; }
        public DateTime ScheduledDate { get; set; }
        public string Interviewer { get; set; }
        public string Mode { get; set; } // In-person, Zoom, etc.
        public string Feedback { get; set; }
    }
   
}
