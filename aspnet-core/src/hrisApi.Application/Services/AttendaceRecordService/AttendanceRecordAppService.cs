using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using hrisApi.Domains.Attendance_Management;
using hrisApi.Services.AttendaceRecordService.DTO;

namespace hrisApi.Services.AttendaceRecordService
{
    public class AttendanceRecordAppService : AsyncCrudAppService<AttendanceRecord, AttendanceRecordDto, Guid>, IAttendanceRecordAppService
    {
        public AttendanceRecordAppService(IRepository<AttendanceRecord, Guid> repository) : base(repository)
        {
        }
    }
}
