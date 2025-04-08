using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using hrisApi.EntityFrameworkCore;
using hrisApi.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace hrisApi.Web.Tests;

[DependsOn(
    typeof(hrisApiWebMvcModule),
    typeof(AbpAspNetCoreTestBaseModule)
)]
public class hrisApiWebTestModule : AbpModule
{
    public hrisApiWebTestModule(hrisApiEntityFrameworkModule abpProjectNameEntityFrameworkModule)
    {
        abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
    }

    public override void PreInitialize()
    {
        Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
    }

    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(typeof(hrisApiWebTestModule).GetAssembly());
    }

    public override void PostInitialize()
    {
        IocManager.Resolve<ApplicationPartManager>()
            .AddApplicationPartsIfNotAddedBefore(typeof(hrisApiWebMvcModule).Assembly);
    }
}