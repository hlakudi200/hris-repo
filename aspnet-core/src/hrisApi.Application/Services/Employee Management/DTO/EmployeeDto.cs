using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Authorization.Users;
using hrisApi.Domains.Employee_Management;
using hrisApi.Users.Dto;

namespace hrisApi.Services.Employee_Management.DTO
{
    [AutoMapFrom(typeof(Employee))]
    [AutoMapTo(typeof(Employee))]
    [AutoMap(typeof(Employee))]
    public class EmployeeDto : EntityDto<Guid>
    {

        public string EmployeeNumber { get; set; }
        public long UserId { get; set; }
        public UserDto User { get; set; }
        public string ContactNo { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string NationalIdNumber { get; set; }
        public DateTime HireDate { get; set; }
        public string Position { get; set; }
        public string Department { get; set; }
        public Guid ManagerId { get; set; }

        // User properties (from related User entity)
        public string FullName { get; set; }

        public string Surname { get; set; }
        public string Email { get; set; }

        // Related documents
        public List<EmployeeDocumentDto> Documents { get; set; }


    }
}
