using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using hrisApi.Services.AbsenceReportService.DTO;
using hrisApi.Services.LeaveService.DTO;

namespace hrisApi.Services.LeaveService
{
    public interface ILeaveRequestAppService : IAsyncCrudAppService<LeaveRequestDto, Guid>
    {
        public Task<IList<LeaveRequestDto>> GetByEmpId(Guid id);
        public Task<List<LeaveRequestDto>> GetAllInclude();
    }
}
