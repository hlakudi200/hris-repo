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
            // Check if the username is already taken
            var existingUser = await _userManager.FindByNameAsync(input.UserName);
            if (existingUser != null)
            {
                throw new UserFriendlyException($"Username '{input.UserName}' is already taken.");
            }

            // Check if the email is already used
            var existingEmailUser = await _userManager.FindByEmailAsync(input.EmailAddress);
            if (existingEmailUser != null)
            {
                throw new UserFriendlyException($"Email '{input.EmailAddress}' is already in use.");
            }

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

            if (!result.Succeeded)
            {
                throw new UserFriendlyException($"Could not create the user: {result.Errors.JoinAsString(", ")}");
            }

            await _userManager.AddToRoleAsync(user, "APPLICANT");

            return ObjectMapper.Map<UserDto>(user);
        }

    }
}
