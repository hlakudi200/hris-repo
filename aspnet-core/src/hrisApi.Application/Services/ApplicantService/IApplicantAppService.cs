using Abp.Application.Services;
using hrisApi.Users.Dto;

namespace hrisApi.Services.ApplicantService
{
    public interface IApplicantAppService : IAsyncCrudAppService<UserDto, long>
    {
    }
}
