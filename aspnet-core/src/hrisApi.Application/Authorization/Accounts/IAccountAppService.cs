using Abp.Application.Services;
using hrisApi.Authorization.Accounts.Dto;
using System.Threading.Tasks;

namespace hrisApi.Authorization.Accounts;

public interface IAccountAppService : IApplicationService
{
    Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

    Task<RegisterOutput> Register(RegisterInput input);
}
