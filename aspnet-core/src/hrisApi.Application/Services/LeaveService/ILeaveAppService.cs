using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using hrisApi.Services.Employee_Management.DTO;
using hrisApi.Services.LeaveService.DTO;

namespace hrisApi.Services.LeaveService
{
    public interface ILeaveAppService : IAsyncCrudAppService<LeaveDto, Guid>
    {
    }
}
