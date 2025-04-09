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
        
        public string Title { get; set; }
        public string Department { get; set; }
        public string Description { get; set; }
        public DateTime OpenDate { get; set; }
        public DateTime? CloseDate { get; set; }

        public ICollection<JobApplication> Applications { get; set; }

    }
}
