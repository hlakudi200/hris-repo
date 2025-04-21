using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using Microsoft.AspNetCore.Builder;

namespace hrisApi.Domains.Recruitment_Module
{
    public class JobPosting : FullAuditedEntity<Guid>
    {

        public string Title { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public DateTime OpenDate { get; set; }
        public DateTime? CloseDate { get; set; }

        public string Status { get; set; } = string.Empty;

        public ICollection<JobApplication> Applications { get; set; }

    }
}
