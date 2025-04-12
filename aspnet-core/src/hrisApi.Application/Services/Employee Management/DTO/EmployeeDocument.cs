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
        public IFormFile File { get; set; }
        
        public string FileName { get; set; }

    
       
    }
}
