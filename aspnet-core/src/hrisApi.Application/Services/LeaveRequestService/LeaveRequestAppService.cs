using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using hrisApi.Domains.Attendance_Management;
using hrisApi.Services.LeaveService.DTO;
using Microsoft.EntityFrameworkCore;

namespace hrisApi.Services.LeaveService
{
    public class LeaveRequestAppService : AsyncCrudAppService<LeaveRequest, LeaveRequestDto, Guid>, ILeaveRequestAppService
    {
        private readonly IRepository<LeaveRequest, Guid> _repository;
        public LeaveRequestAppService(IRepository<LeaveRequest, Guid> repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task<List<LeaveRequestDto>> GetAllInclude()
        {
            var querable = await _repository.GetAllAsync();
            var leaveRequests = querable.Include(p => p.Employee).ThenInclude(p => p.User);
            var results = ObjectMapper.Map<List<LeaveRequestDto>>(leaveRequests);

            return results;
        }

        public async Task<IList<LeaveRequestDto>> GetByEmpId(Guid id)
        {
            var leaveRequests = await _repository.GetAllListAsync(l => l.EmployeeId == id);

            var result = ObjectMapper.Map<IList<LeaveRequestDto>>(leaveRequests);

            return result;
        }

    }
}
