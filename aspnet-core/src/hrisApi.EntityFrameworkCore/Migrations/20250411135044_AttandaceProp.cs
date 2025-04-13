using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hrisApi.Migrations
{
    /// <inheritdoc />
    public partial class AttandaceProp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "RecordMonthWeek",
                table: "AttendanceRecords",
                newName: "YearMonthWeek");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "YearMonthWeek",
                table: "AttendanceRecords",
                newName: "RecordMonthWeek");
        }
    }
}
