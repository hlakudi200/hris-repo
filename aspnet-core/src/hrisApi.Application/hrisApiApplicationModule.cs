using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using hrisApi.Authorization;

namespace hrisApi;

[DependsOn(
    typeof(hrisApiCoreModule),
    typeof(AbpAutoMapperModule))]
public class hrisApiApplicationModule : AbpModule
{
    public override void PreInitialize()
    {
        Configuration.Authorization.Providers.Add<hrisApiAuthorizationProvider>();
    }

    public override void Initialize()
    {
        var thisAssembly = typeof(hrisApiApplicationModule).GetAssembly();

        IocManager.RegisterAssemblyByConvention(thisAssembly);

        Configuration.Modules.AbpAutoMapper().Configurators.Add(
            // Scan the assembly for classes which inherit from AutoMapper.Profile
            cfg => cfg.AddMaps(thisAssembly)
        );
    }
}
