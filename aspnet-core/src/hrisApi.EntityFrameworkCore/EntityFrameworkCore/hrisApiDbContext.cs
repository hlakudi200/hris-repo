using Abp.Zero.EntityFrameworkCore;
using hrisApi.Authorization.Roles;
using hrisApi.Authorization.Users;
using hrisApi.Domains.Attendance_Management;
using hrisApi.Domains.Employee_Management;
using hrisApi.Domains.Payroll_Processing;
using hrisApi.Domains.Recruitment_Module;
using hrisApi.MultiTenancy;
using Microsoft.EntityFrameworkCore;

namespace hrisApi.EntityFrameworkCore;

public class hrisApiDbContext : AbpZeroDbContext<Tenant, Role, User, hrisApiDbContext>
{
    /* Define a DbSet for each entity of the application */
    public DbSet<Employee> Employees { get; set; }
    public DbSet<EmployeeDocument> EmployeeDocuments { get; set; }
    public DbSet<AbsenceReport> AbsenceReports { get; set; }
    public DbSet<LeaveRequest> LeaveRequests { get; set; }
    public DbSet<AttendanceRecord> AttendanceRecords { get; set; }
    public DbSet<JobApplication> jobApplications { get; set; }
    public DbSet<JobPosting> jobPostings { get; set; }
    public DbSet<OfferLetter> offerLetters { get; set; }
    public DbSet<PayrollProfile> PayrollProfiles { get; set; }
    public DbSet<PayrollTransaction> PayrollTransactions { get; set; }
    public DbSet<BonusOrCommission> BonusOrCommissions { get; set; }
    public DbSet<Reimbursement> Reimbursements { get; set; }
    public hrisApiDbContext(DbContextOptions<hrisApiDbContext> options)
        : base(options)
    {
    }
}
