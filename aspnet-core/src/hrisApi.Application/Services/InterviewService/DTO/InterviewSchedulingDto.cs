using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hrisApi.Services.InterviewService.DTO
{
    public class InterviewSchedulingDto
    {
        public Guid JobApplicationId { get; set; }
        public DateTime ScheduledDate { get; set; }
        public string Interviewer { get; set; }
        public string Mode { get; set; }
        public string Location { get; set; } // For in-person interviews or meeting links
        public string AdditionalInformation { get; set; }
    }
}
