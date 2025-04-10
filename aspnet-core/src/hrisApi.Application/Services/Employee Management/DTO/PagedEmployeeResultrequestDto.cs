using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;

namespace hrisApi.Services.Employee_Management.DTO
{
    // Request DTO for paged employee results with filtering/sorting
    public class PagedEmployeeResultRequestDto : PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public string Department { get; set; }
        public string Sorting { get; set; }

        public string EmployeeNumber { get; set; }
        public string FullName { get; set; }
        public string Position { get; set; }
       
    }
}
