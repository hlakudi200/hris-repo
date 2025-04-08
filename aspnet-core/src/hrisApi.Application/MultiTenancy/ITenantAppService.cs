using Abp.Application.Services;
using hrisApi.MultiTenancy.Dto;

namespace hrisApi.MultiTenancy;

public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
{
}

