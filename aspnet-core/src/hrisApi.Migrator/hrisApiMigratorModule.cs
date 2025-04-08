using Abp.Events.Bus;
using Abp.Modules;
using Abp.Reflection.Extensions;
using hrisApi.Configuration;
using hrisApi.EntityFrameworkCore;
using hrisApi.Migrator.DependencyInjection;
using Castle.MicroKernel.Registration;
using Microsoft.Extensions.Configuration;

namespace hrisApi.Migrator;

[DependsOn(typeof(hrisApiEntityFrameworkModule))]
public class hrisApiMigratorModule : AbpModule
{
    private readonly IConfigurationRoot _appConfiguration;

    public hrisApiMigratorModule(hrisApiEntityFrameworkModule abpProjectNameEntityFrameworkModule)
    {
        abpProjectNameEntityFrameworkModule.SkipDbSeed = true;

        _appConfiguration = AppConfigurations.Get(
            typeof(hrisApiMigratorModule).GetAssembly().GetDirectoryPathOrNull()
        );
    }

    public override void PreInitialize()
    {
        Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
            hrisApiConsts.ConnectionStringName
        );

        Configuration.BackgroundJobs.IsJobExecutionEnabled = false;
        Configuration.ReplaceService(
            typeof(IEventBus),
            () => IocManager.IocContainer.Register(
                Component.For<IEventBus>().Instance(NullEventBus.Instance)
            )
        );
    }

    public override void Initialize()
    {
        IocManager.RegisterAssemblyByConvention(typeof(hrisApiMigratorModule).GetAssembly());
        ServiceCollectionRegistrar.Register(IocManager);
    }
}
