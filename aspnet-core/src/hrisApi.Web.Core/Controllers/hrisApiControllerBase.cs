using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace hrisApi.Controllers
{
    public abstract class hrisApiControllerBase : AbpController
    {
        protected hrisApiControllerBase()
        {
            LocalizationSourceName = hrisApiConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
