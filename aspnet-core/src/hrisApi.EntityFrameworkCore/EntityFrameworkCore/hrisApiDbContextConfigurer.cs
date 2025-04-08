using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace hrisApi.EntityFrameworkCore;

public static class hrisApiDbContextConfigurer
{
    public static void Configure(DbContextOptionsBuilder<hrisApiDbContext> builder, string connectionString)
    {
        builder.UseSqlServer(connectionString);
    }

    public static void Configure(DbContextOptionsBuilder<hrisApiDbContext> builder, DbConnection connection)
    {
        builder.UseSqlServer(connection);
    }
}
