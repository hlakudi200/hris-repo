using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Authorization;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.UI;
using hrisApi.Authorization.Users;
using hrisApi.Users.Dto;

namespace hrisApi.Services.ApplicantService
{
    public class ApplicantAppService : AsyncCrudAppService<User, UserDto, long>, IApplicantAppService
    {
        private readonly UserManager _userManager;
        public ApplicantAppService(IRepository<User, long> repository, UserManager userManager) : base(repository)
        {
            _userManager = userManager;
        }

        public async Task<UserDto> CreateApplicant(CreateUserDto input)
        {
            var user = new User
            {
                UserName = input.UserName,
                EmailAddress = input.EmailAddress,
                Name = input.Name,
                Surname = input.Surname,
                IsEmailConfirmed = false,
                TenantId = AbpSession.TenantId
            };
            var result = await _userManager.CreateAsync(user, input.Password);

            await _userManager.AddToRoleAsync(user, "APPLICANT");


            if (!result.Succeeded)
            {
                throw new UserFriendlyException($"Could not create the user: {result.Errors.JoinAsString(", ")}");
            }

            return ObjectMapper.Map<UserDto>(user);
        }
    }
}
