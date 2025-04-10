using System;
using Abp.Application.Services;
using hrisApi.Services.AttendaceRecordService.DTO;

namespace hrisApi.Services.AttendaceRecordService
{
    public interface IAttendanceRecordAppService : IAsyncCrudAppService<AttendanceRecordDto, Guid>
    {

    }
}
