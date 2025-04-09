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
        public string Title { get; set; }
        public string ReportType { get; set; } 
        
        public DateTime GeneratedOn { get; set; }
        public string GeneratedBy { get; set; }
        public string FilePath { get; set; }
    }
}
