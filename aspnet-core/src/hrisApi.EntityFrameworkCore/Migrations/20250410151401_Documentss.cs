﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hrisApi.Migrations
{
    /// <inheritdoc />
    public partial class Documentss : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeDocuments_Employees_EmployeeId",
                table: "EmployeeDocuments");

            migrationBuilder.AlterColumn<Guid>(
                name: "EmployeeId",
                table: "EmployeeDocuments",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeDocuments_Employees_EmployeeId",
                table: "EmployeeDocuments",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeDocuments_Employees_EmployeeId",
                table: "EmployeeDocuments");

            migrationBuilder.AlterColumn<Guid>(
                name: "EmployeeId",
                table: "EmployeeDocuments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeDocuments_Employees_EmployeeId",
                table: "EmployeeDocuments",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
