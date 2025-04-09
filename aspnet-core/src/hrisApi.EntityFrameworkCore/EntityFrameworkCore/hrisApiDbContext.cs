using Abp.Zero.EntityFrameworkCore;
using hrisApi.Authorization.Roles;
using hrisApi.Authorization.Users;
using hrisApi.Domains.Employee_Management;
using hrisApi.MultiTenancy;
using Microsoft.EntityFrameworkCore;

namespace hrisApi.EntityFrameworkCore;

public class hrisApiDbContext : AbpZeroDbContext<Tenant, Role, User, hrisApiDbContext>
{
    /* Define a DbSet for each entity of the application */

    public DbSet<Employee> Employees { get; set; }

    public DbSet<EmployeeDocument> EmployeeDocuments { get; set; }


    public hrisApiDbContext(DbContextOptions<hrisApiDbContext> options)
        : base(options)
    {
    }
}
