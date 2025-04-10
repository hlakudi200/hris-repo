using System;
using Abp.Application.Services;
using hrisApi.Services.AbsenceReportService.DTO;

namespace hrisApi.Services.AbsenceReportService
{
    public interface IAbsenceReportAppService : IAsyncCrudAppService<AbsenceReportDto, Guid>
    {

    }
}
