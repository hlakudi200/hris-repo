using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Domains.Employee_Management;

namespace hrisApi.Services.Employee_Management.DTO
{
   
    [AutoMapTo(typeof(Employee))]
    public class UpdateEmployeeDto : FullAuditedEntityDto<Guid>
    {


        [Required]
        public DateTime DateOfBirth { get; set; }

        public string? Name { get; set; }
        public string? Surname { get; set; }

        public string? Email { get; set; }

        [Required]
        public DateTime HireDate { get; set; }
        public string? Username { get; set; }

        //public string Password { get; set; }
        public string EmployeeNumber { get; set; }


        [Phone]
        [StringLength(10, ErrorMessage = "Please make sure is 10 digits")]
        public string ContactNo { get; set; }

        [StringLength(13, ErrorMessage = "Please make sure is 13 digits")]
        public string NationalIdNumber { get; set; }

        [StringLength(50)]
        public string Position { get; set; }

        [StringLength(50)]
        public string Department { get; set; }

        public Guid? ManagerId { get; set; }
    }

}
