using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hrisApi.Migrations
{
    public partial class Jobapplicant : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // 1. Add ApplicantId column if it doesn't already exist
            migrationBuilder.Sql(@"
                DO $$
                BEGIN
                    IF NOT EXISTS (
                        SELECT 1
                          FROM information_schema.columns
                         WHERE table_name = 'jobapplications'
                           AND column_name = 'applicantid'
                    ) THEN
                        ALTER TABLE ""jobApplications""
                            ADD COLUMN ""ApplicantId"" uuid;
                    END IF;
                END
                $$;
            ");

            // 2. Drop any lingering FK on ApplicantId (if someone partially applied an older migration)
            migrationBuilder.Sql(@"
                DO $$
                BEGIN
                    IF EXISTS (
                        SELECT 1
                          FROM pg_constraint c
                          JOIN pg_class t ON c.conrelid = t.oid
                         WHERE t.relname = 'jobapplications'
                           AND c.conname = 'FK_jobApplications_Applicant_ApplicantId'
                    ) THEN
                        ALTER TABLE ""jobApplications"" 
                            DROP CONSTRAINT ""FK_jobApplications_Applicant_ApplicantId"";
                    END IF;
                END
                $$;
            ");

            // 3. Drop the old Applicant table if it exists
            migrationBuilder.Sql(@"DROP TABLE IF EXISTS ""Applicant"";");

            // 4. Create the new JobApplicants table
            migrationBuilder.CreateTable(
                name: "JobApplicants",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    NationalIdNo = table.Column<int>(type: "integer", nullable: false),
                    Gender = table.Column<string>(type: "text", nullable: true),
                    DateofBirth = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CellphoneNo = table.Column<string>(type: "text", nullable: true),
                    AlternativePhone = table.Column<string>(type: "text", nullable: true),
                    AddressLine1 = table.Column<string>(type: "text", nullable: true),
                    AddressLine2 = table.Column<string>(type: "text", nullable: true),
                    City = table.Column<string>(type: "text", nullable: true),
                    Province = table.Column<string>(type: "text", nullable: true),
                    Country = table.Column<string>(type: "text", nullable: true),
                    PostalCode = table.Column<string>(type: "text", nullable: true),
                    HighestQualification = table.Column<string>(type: "text", nullable: true),
                    FieldOfStudy = table.Column<string>(type: "text", nullable: true),
                    Institution = table.Column<string>(type: "text", nullable: true),
                    GraduationYear = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    YearsOfExperience = table.Column<int>(type: "integer", nullable: false),
                    CurrentEmployer = table.Column<string>(type: "text", nullable: true),
                    CurrentPosition = table.Column<string>(type: "text", nullable: true),
                    CurrentSalary = table.Column<decimal>(type: "numeric", nullable: false),
                    ResumeUrl = table.Column<string>(type: "text", nullable: true),
                    Coverletter = table.Column<string>(type: "text", nullable: true),
                    IsWillingToRelocate = table.Column<bool>(type: "boolean", nullable: false),
                    HasCriminalRecord = table.Column<bool>(type: "boolean", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobApplicants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobApplicants_AbpUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_JobApplicants_UserId",
                table: "JobApplicants",
                column: "UserId");

            // 5. Finally, hook up jobApplications.ApplicantId → JobApplicants.Id
            migrationBuilder.AddForeignKey(
                name: "FK_jobApplications_JobApplicants_ApplicantId",
                table: "jobApplications",
                column: "ApplicantId",
                principalTable: "JobApplicants",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Drop the FK if it exists
            migrationBuilder.Sql(@"
                DO $$
                BEGIN
                    IF EXISTS (
                        SELECT 1
                          FROM pg_constraint c
                          JOIN pg_class t ON c.conrelid = t.oid
                         WHERE t.relname = 'jobapplications'
                           AND c.conname = 'FK_jobApplications_JobApplicants_ApplicantId'
                    ) THEN
                        ALTER TABLE ""jobApplications"" 
                            DROP CONSTRAINT ""FK_jobApplications_JobApplicants_ApplicantId"";
                    END IF;
                END
                $$;
            ");

            // Drop the JobApplicants table
            migrationBuilder.DropTable(name: "JobApplicants");

            // Optionally drop the ApplicantId column
            migrationBuilder.Sql(@"
                DO $$
                BEGIN
                    IF EXISTS (
                        SELECT 1
                          FROM information_schema.columns
                         WHERE table_name = 'jobapplications'
                           AND column_name = 'applicantid'
                    ) THEN
                        ALTER TABLE ""jobApplications"" DROP COLUMN ""ApplicantId"";
                    END IF;
                END
                $$;
            ");
        }
    }
}
