using Abp.Domain.Uow;
using Abp.EntityFrameworkCore;
using Abp.MultiTenancy;
using Abp.Zero.EntityFrameworkCore;

namespace hrisApi.EntityFrameworkCore;

public class AbpZeroDbMigrator : AbpZeroDbMigrator<hrisApiDbContext>
{
    public AbpZeroDbMigrator(
        IUnitOfWorkManager unitOfWorkManager,
        IDbPerTenantConnectionStringResolver connectionStringResolver,
        IDbContextResolver dbContextResolver)
        : base(
            unitOfWorkManager,
            connectionStringResolver,
            dbContextResolver)
    {
    }
}
