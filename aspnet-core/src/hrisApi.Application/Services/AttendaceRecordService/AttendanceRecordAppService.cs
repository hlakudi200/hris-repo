using System;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using hrisApi.Domains.Attendance_Management;
using hrisApi.Services.AttendaceRecordService.DTO;
using NuGet.Protocol.Core.Types;

namespace hrisApi.Services.AttendaceRecordService
{
    [AbpAuthorize]
    public class AttendanceRecordAppService : AsyncCrudAppService<AttendanceRecord, AttendanceRecordDto, Guid>, IAttendanceRecordAppService
    {
        public AttendanceRecordAppService(IRepository<AttendanceRecord, Guid> repository) : base(repository)
        {
        }

        public async Task<double> GetWeeklyHours(Guid employeeId)
        {
            var currentWeek = GetCurrentYearWeek();
            var records = await Repository.GetAllListAsync(r =>
                r.EmployeeId == employeeId &&
                r.YearMonthWeek == currentWeek &&
                r.ClockOutTime != null);

            return records.Sum(record => (record.ClockOutTime - record.ClockInTime).TotalHours);
        }

        private string GetCurrentYearWeek()
        {
            var date = DateTime.UtcNow;
            int year = ISOWeek.GetYear(date);
            int week = ISOWeek.GetWeekOfYear(date);
            return $"{year}-W{week:D2}";
        }
    }
}