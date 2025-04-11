using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using hrisApi.Domains.Attendance_Management;
using hrisApi.Services.LeaveService.DTO;

namespace hrisApi.Services.LeaveService
{
    public class LeaveAppService : AsyncCrudAppService<Leave, LeaveDto, Guid>, ILeaveAppService
    {
        public LeaveAppService(IRepository<Leave, Guid> repository) : base(repository)
        {
        }
    }
}
