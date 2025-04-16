using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;

namespace hrisApi.Domains.Recruitment_Module
{
    public class Interview : FullAuditedEntity<Guid>
    {

        public Guid JobApplicationId { get; set; }
        public DateTime ScheduledDate { get; set; }
        public string Interviewer { get; set; } = string.Empty;
        public string Mode { get; set; } = string.Empty; // In-person, Zoom, etc.
        public string Feedback { get; set; } = string.Empty;
    }
}
