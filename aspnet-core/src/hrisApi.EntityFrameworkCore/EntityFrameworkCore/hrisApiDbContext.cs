using Abp.Zero.EntityFrameworkCore;
using hrisApi.Authorization.Roles;
using hrisApi.Authorization.Users;
using hrisApi.MultiTenancy;
using Microsoft.EntityFrameworkCore;

namespace hrisApi.EntityFrameworkCore;

public class hrisApiDbContext : AbpZeroDbContext<Tenant, Role, User, hrisApiDbContext>
{
    /* Define a DbSet for each entity of the application */

    public hrisApiDbContext(DbContextOptions<hrisApiDbContext> options)
        : base(options)
    {
    }
}
