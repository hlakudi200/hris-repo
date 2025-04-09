using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;

namespace hrisApi.Domains.Recruitment_Module
{
    public class JobApplication : FullAuditedEntity<Guid>
    {
        
        public Guid JobPostingId { get; set; }
        public string ApplicantName { get; set; }
        public string Email { get; set; }
        public string ResumePath { get; set; }
        public string Status { get; set; } 
       public ICollection<Interview> Interviews { get; set; }
    }


}
