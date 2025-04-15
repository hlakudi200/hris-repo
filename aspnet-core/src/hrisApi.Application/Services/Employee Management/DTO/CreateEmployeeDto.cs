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
    public class CreateEmployeeDto : EntityDto<Guid>
    {

        //[Required]
        //public long UserId { get; set; }

        public string Name { get; set; }
        public string Surname { get; set; }

        public string Email { get; set; }

       
        public string Username { get; set; }

        public string Password { get; set; }
        public string EmployeeNumber { get; set; }

        [Required]
        [Phone]
        [StringLength(10, ErrorMessage = "Please make sure contact number is 10 digits")]
        public string ContactNo { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [StringLength(13, ErrorMessage = "Please make sure Identification Number is 13 digits")]
        public string NationalIdNumber { get; set; }

        [Required]
        public DateTime HireDate { get; set; }

        [Required]
        [StringLength(50)]
        public string Position { get; set; }

        [Required]
        [StringLength(50)]
        public string Department { get; set; }

        public Guid ManagerId { get; set; }

        public string[] RoleNames { get; set; }




    }
}
