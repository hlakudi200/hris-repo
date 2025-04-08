using hrisApi.Configuration.Dto;
using System.Threading.Tasks;

namespace hrisApi.Configuration;

public interface IConfigurationAppService
{
    Task ChangeUiTheme(ChangeUiThemeInput input);
}
