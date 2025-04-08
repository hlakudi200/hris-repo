using Abp.Application.Services;
using hrisApi.Sessions.Dto;
using System.Threading.Tasks;

namespace hrisApi.Sessions;

public interface ISessionAppService : IApplicationService
{
    Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
}
