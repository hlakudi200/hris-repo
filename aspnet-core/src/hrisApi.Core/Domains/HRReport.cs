using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;

namespace hrisApi.Domains
{
    public class HRReport : FullAuditedEntity<Guid>
    {
        public string Title { get; set; } = string.Empty;
        public string ReportType { get; set; } = string.Empty;

        public DateTime GeneratedOn { get; set; }
        public string GeneratedBy { get; set; } = string.Empty;
        public string FilePath { get; set; } = string.Empty;
    }
}
