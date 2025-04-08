using Abp.Authorization;
using hrisApi.Authorization.Roles;
using hrisApi.Authorization.Users;

namespace hrisApi.Authorization;

public class PermissionChecker : PermissionChecker<Role, User>
{
    public PermissionChecker(UserManager userManager)
        : base(userManager)
    {
    }
}
