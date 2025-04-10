using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using hrisApi.Domains.Attendance_Management;
using hrisApi.Services.AbsenceReportService.DTO;
using hrisApi.Services.AbsenceReportService;
using Abp.Domain.Repositories;
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
