using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using Microsoft.AspNetCore.Http;

namespace hrisApi.Domains.Employee_Management
{
    public class EmployeeDocument : FullAuditedEntity<Guid>
    {
        public Guid EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public Employee Employee { get; set; }

        [NotMapped]
        public virtual IFormFile File { get; set; }

        [Required]
        [StringLength(20)]
        public string DocumentType { get; set; } 

        [Required]
        [StringLength(100)]
        public string FilePath { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime UploadDate { get; set; }
    }
}
