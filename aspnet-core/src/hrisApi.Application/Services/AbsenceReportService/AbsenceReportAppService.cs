using System;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using hrisApi.Domains.Attendance_Management;
using hrisApi.Services.AbsenceReportService.DTO;

namespace hrisApi.Services.AbsenceReportService
{
    public class AbsenceReportAppService : AsyncCrudAppService<AbsenceReport, AbsenceReportDto, Guid>, IAbsenceReportAppService
    {
        public AbsenceReportAppService(IRepository<AbsenceReport, Guid> repository) : base(repository)
        {
        }
    }
}
