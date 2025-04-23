using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using hrisApi.Services.JobApllicantService.DTO;

namespace hrisApi.Services.JobApllicantService
{
    public interface IJobApplicantAppSerice : IAsyncCrudAppService<JobApplicantDto, Guid>
    {

    }
}
