using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using hrisApi.Services.AttendaceRecordService.DTO;

namespace hrisApi.Services.AttendaceRecordService
{
    public interface IAttendanceRecordAppService : IAsyncCrudAppService<AttendanceRecordDto, Guid>
    {
        Task<double> GetWeeklyHours(Guid employeeId);
    }
}