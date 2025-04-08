using Abp.Authorization;
using Abp.Runtime.Session;
using hrisApi.Configuration.Dto;
using System.Threading.Tasks;

namespace hrisApi.Configuration;

[AbpAuthorize]
public class ConfigurationAppService : hrisApiAppServiceBase, IConfigurationAppService
{
    public async Task ChangeUiTheme(ChangeUiThemeInput input)
    {
        await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
    }
}
