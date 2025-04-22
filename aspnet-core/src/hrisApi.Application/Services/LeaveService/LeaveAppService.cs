using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using hrisApi.Domains.Attendance_Management;
using hrisApi.Services.LeaveService.DTO;

namespace hrisApi.Services.LeaveService
{
    [AbpAuthorize]
    public class LeaveAppService : AsyncCrudAppService<Leave, LeaveDto, Guid>, ILeaveAppService
    {
        private readonly IRepository<Leave, Guid> _leaveRepository;
        public LeaveAppService(IRepository<Leave, Guid> repository) : base(repository)
        {
            _leaveRepository = repository;
        }

        public async Task<LeaveDto> GetByEmpId(Guid employeeId)
        {
            var leaves = await _leaveRepository.FirstOrDefaultAsync(l => l.EmployeeId == employeeId);

            return leaves != null ? ObjectMapper.Map<LeaveDto>(leaves) : null;
        }

    }
}
