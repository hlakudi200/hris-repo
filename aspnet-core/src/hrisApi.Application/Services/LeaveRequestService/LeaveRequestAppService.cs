using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using hrisApi.Domains.Attendance_Management;
using hrisApi.Services.LeaveService.DTO;

namespace hrisApi.Services.LeaveService
{
    public class LeaveRequestAppService : AsyncCrudAppService<LeaveRequest, LeaveRequestDto, Guid>, ILeaveRequestAppService
    {
        public LeaveRequestAppService(IRepository<LeaveRequest, Guid> repository) : base(repository)
        {
        }
    }
}
