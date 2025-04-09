using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Domains.Employee_Management;

namespace hrisApi.Services.Employee_Management.DTO
{
    [AutoMapFrom(typeof(Employee))]
    public class EmployeeListDto : FullAuditedEntityDto<Guid>
    {
        public string EmployeeNumber { get; set; }
        public string FullName { get; set; }
        public string Position { get; set; }
        public string Department { get; set; }
    }
}
