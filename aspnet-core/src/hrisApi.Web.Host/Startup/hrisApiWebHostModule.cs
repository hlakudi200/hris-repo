using Abp.Modules;
using Abp.Reflection.Extensions;
using hrisApi.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace hrisApi.Web.Host.Startup
{
    [DependsOn(
       typeof(hrisApiWebCoreModule))]
    public class hrisApiWebHostModule : AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public hrisApiWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(hrisApiWebHostModule).GetAssembly());
        }
    }
}
