using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;

namespace hrisApi.Domains.Recruitment_Module
{
    public class JobApplication : FullAuditedEntity<Guid>
    {
        public Guid JobPostingId { get; set; }

        [ForeignKey(nameof(JobPostingId))]
        public JobPosting JobPosting { get; set; }
        public string ApplicantName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string ResumePath { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public ICollection<Interview> Interviews { get; set; }
    }


}
