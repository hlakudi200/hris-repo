using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using hrisApi.Services.Employee_Management.DTO;

namespace hrisApi.Services.Employee_Management
{
    public interface IEmployeeAppService : IAsyncCrudAppService<CreateEmployeeDto, Guid>
    {
    }
}
