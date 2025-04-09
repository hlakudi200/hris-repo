using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.AutoMapper;
using hrisApi.Domains.Employee_Management;
using Microsoft.AspNetCore.Http;

namespace hrisApi.Services.Employee_Management.DTO
{
    [AutoMapTo(typeof(EmployeeDocument))]
    public class CreateEmployeeDocumentDto
    {
        [Required]
        public Guid EmployeeId { get; set; }

        public IFormFile File { get; set; }

        [Required]
        [StringLength(20)]
        public string DocumentType { get; set; }

        [Required]
        [StringLength(100)]
        public string FilePath { get; set; }
    }
}
