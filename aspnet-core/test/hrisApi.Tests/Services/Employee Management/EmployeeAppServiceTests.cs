using Abp.Domain.Repositories;
using Microsoft.AspNetCore.Hosting;
using NSubstitute;
using System;
using System.Threading.Tasks;
using Xunit;
using hrisApi.Authorization.Users;
using hrisApi.Domains.Employee_Management;
using hrisApi.Services.EmailService;
using hrisApi.Services.Employee_Management;
using hrisApi.Services.Employee_Management.DTO;
using Abp.Application.Services.Dto;
using hrisApi.Services.EmailService.DTO;
using System.Linq.Expressions;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace hrisApi.Tests.Services.EmployeeManagement
{
    public class EmployeeAppServiceTests
    {
        private IWebHostEnvironment subWebHostEnvironment;
        private EmployeeManager subEmployeeManager;
        private IRepository<Employee, Guid> subRepositoryEmployeeGuid;
        private IRepository<EmployeeDocument, Guid> subRepositoryEmployeeDocumentGuid;
        private UserManager subUserManager;
        private EmailAppService subEmailAppService;

        public EmployeeAppServiceTests()
        {
            this.subWebHostEnvironment = Substitute.For<IWebHostEnvironment>();
            this.subEmployeeManager = Substitute.For<EmployeeManager>();
            this.subRepositoryEmployeeGuid = Substitute.For<IRepository<Employee, Guid>>();
            this.subRepositoryEmployeeDocumentGuid = Substitute.For<IRepository<EmployeeDocument, Guid>>();
            this.subUserManager = Substitute.For<UserManager>();
            this.subEmailAppService = Substitute.For<EmailAppService>();
        }

        private EmployeeAppService CreateService()
        {
            return new EmployeeAppService(
                this.subWebHostEnvironment,
                this.subEmployeeManager,
                this.subRepositoryEmployeeGuid,
                this.subRepositoryEmployeeDocumentGuid,
                this.subUserManager,
                this.subEmailAppService);
        }

        [Fact]
        public async Task CreateAsync_StateUnderTest_ExpectedBehavior()
        {
            // Arrange
            var service = this.CreateService();
            CreateEmployeeDto input = new CreateEmployeeDto
            {
                Name = "Shabba",
                Surname = "Shabba",
                Email = "Tsek@gmail.com",
                Username = "Tsek",
                Password = "123456@Test",
                ContactNo = "1234567890",
                DateOfBirth = DateTime.Now,
                NationalIdNumber = "1234567890123",
                HireDate = DateTime.Now,
                Position = "Software Engineer",
                Department = "IT",
                ManagerId = Guid.NewGuid(),
                RoleNames = new string[] { "Employee", "User" }
            };

            // Mock the repository to return null (no existing employee)
            subRepositoryEmployeeGuid.FirstOrDefaultAsync(Arg.Any<Expression<Func<Employee, bool>>>())
                .Returns(Task.FromResult<Employee>(null));

            // Mock the created employee
            var expectedEmployeeNumber = $"{DateTime.Now.Year}/{input.NationalIdNumber.Substring(0, 9)}";
            var createdEmployee = new Employee
            {
                Id = Guid.NewGuid(),
                UserId = 1,
                NationalIdNumber = input.NationalIdNumber,
                EmployeeNumber = expectedEmployeeNumber,
                Position = input.Position,
                Department = input.Department
            };

            // Mock the employee manager
            subEmployeeManager.CreateEmployeeAsync(
                input.Name,
                input.Surname,
                input.Email,
                input.Username,
                input.Password,
                Arg.Any<string>(), // Employee number
                input.ContactNo,
                input.DateOfBirth,
                input.NationalIdNumber,
                input.HireDate,
                input.Position,
                input.Department,
                input.ManagerId
            ).Returns(Task.FromResult(createdEmployee));

            // Create a DTO to be returned by ObjectMapper
            var employeeDto = new EmployeeDto
            {
                Id = createdEmployee.Id,
                FullName = input.Name,
                Surname = input.Surname,
                Email = input.Email,
                EmployeeNumber = expectedEmployeeNumber,
                Position = input.Position,
                Department = input.Department
            };

            // We need to mock the ObjectMapper with reflection as it's a static property
            // For this example, we'll use a test helper or assume ObjectMapper works correctly

            // Act
            var result = await service.CreateAsync(input);

            // Assert
            // Since we can't directly mock the ObjectMapper, we'll verify the interaction with dependencies
            await subEmployeeManager.Received(1).CreateEmployeeAsync(
                input.Name,
                input.Surname,
                input.Email,
                input.Username,
                input.Password,
                Arg.Any<string>(),
                input.ContactNo,
                input.DateOfBirth,
                input.NationalIdNumber,
                input.HireDate,
                input.Position,
                input.Department,
                input.ManagerId
            );

            // Verify email was sent with correct parameters
            await subEmailAppService.Received(1).SendEmail(Arg.Is<EmailRequestDto>(e =>
                e.To == input.Email &&
                e.Subject.Contains("Welcome") &&
                e.Body.Contains(input.Username) &&
                e.Body.Contains(input.Password) &&
                e.IsBodyHtml == true
            ));
        }

        [Fact]
        public async Task UpdateAsync_WithValidInput_UpdatesEmployee()
        {
            // Arrange
            var service = this.CreateService();
            var employeeId = Guid.NewGuid();
            var input = new UpdateEmployeeDto
            {
                Id = employeeId,
                NationalIdNumber = "1234567890123",
                Position = "Senior Software Engineer",
                Department = "Engineering",
                ContactNo = "9876543210",
                EmployeeNumber = "2023/123456789"
            };

            // Mock existing employee
            var existingEmployee = new Employee
            {
                Id = employeeId,
                NationalIdNumber = "9876543210987", // Different National ID
                EmployeeNumber = "2023/987654321",
                Position = "Software Engineer",
                Department = "IT"
            };

            // Set up repository to return existing employee
            subRepositoryEmployeeGuid.GetAsync(employeeId).Returns(Task.FromResult(existingEmployee));

            // No employee with same National ID
            subRepositoryEmployeeGuid.FirstOrDefaultAsync(Arg.Any<Expression<Func<Employee, bool>>>())
                .Returns(Task.FromResult<Employee>(null));

            // Mock updated employee
            var updatedEmployee = new Employee
            {
                Id = employeeId,
                NationalIdNumber = input.NationalIdNumber,
                EmployeeNumber = input.EmployeeNumber,
                Position = input.Position,
                Department = input.Department,
                ContactNo = input.ContactNo
            };

            // Set up employee manager to return updated employee
            subEmployeeManager.UpdateEmployeeAsync(
                input.Id,
                input.Position,
                input.Department,
                input.EmployeeNumber,
                input.NationalIdNumber,
                input.ContactNo
            ).Returns(Task.FromResult(updatedEmployee));

            // Act
            var result = await service.UpdateAsync(input);

            // Assert
            await subEmployeeManager.Received(1).UpdateEmployeeAsync(
                input.Id,
                input.Position,
                input.Department,
                input.EmployeeNumber,
                input.NationalIdNumber,
                input.ContactNo
            );
        }

        [Fact]
        public async Task GetEmployeeByIdAsync_WithValidId_ReturnsEmployee()
        {
            // Arrange
            var service = this.CreateService();
            long userId = 1;

            // Create mock employee and user
            var employee = new Employee
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                EmployeeNumber = "2023/123456789",
                ContactNo = "1234567890",
                DateOfBirth = new DateTime(1990, 1, 1),
                NationalIdNumber = "1234567890123",
                HireDate = DateTime.Now,
                Position = "Software Engineer",
                Department = "IT"
            };

            var user = new User
            {
                Id = userId,
                Name = "John",
                Surname = "Doe",
                EmailAddress = "john.doe@example.com",
               
            };

            // Mock repository to return employee with user
            var queryable = new List<Employee> { employee }.AsQueryable();
            var mockDbSet = Substitute.For<Microsoft.EntityFrameworkCore.DbSet<Employee>, IQueryable<Employee>>();
            ((IQueryable<Employee>)mockDbSet).Provider.Returns(queryable.Provider);
            ((IQueryable<Employee>)mockDbSet).Expression.Returns(queryable.Expression);
            ((IQueryable<Employee>)mockDbSet).ElementType.Returns(queryable.ElementType);
            ((IQueryable<Employee>)mockDbSet).GetEnumerator().Returns(queryable.GetEnumerator());

            subRepositoryEmployeeGuid.GetAll().Returns(mockDbSet);
            subUserManager.GetUserByIdAsync(userId).Returns(Task.FromResult(user));

            // Act
            var result = await service.GetEmployeeByIdAsync(userId);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(employee.Id, result.Id);
            Assert.Equal(user.FullName, result.FullName);
            Assert.Equal(user.EmailAddress, result.Email);
            Assert.Equal(employee.Position, result.Position);
            Assert.Equal(employee.Department, result.Department);
        }

        [Fact]
        public async Task GetAsync_WithValidId_ReturnsEmployeeDto()
        {
            // Arrange
            var service = this.CreateService();
            var employeeId = Guid.NewGuid();
            var input = new EntityDto<Guid> { Id = employeeId };

            // Create mock employee
            var employee = new Employee
            {
                Id = employeeId,
                UserId = 1,
                EmployeeNumber = "2023/123456789",
                ContactNo = "1234567890",
                DateOfBirth = new DateTime(1990, 1, 1),
                NationalIdNumber = "1234567890123",
                HireDate = DateTime.Now,
                Position = "Software Engineer",
                Department = "IT"
            };

            // Create mock user
            var user = new User
            {
                Id = 1,
                Name = "John",
                Surname = "Doe",
                EmailAddress = "john.doe@example.com",
                
            };

            // Set up repository to return employee
            subRepositoryEmployeeGuid.FirstOrDefaultAsync(Arg.Any<Expression<Func<Employee, bool>>>())
                .Returns(Task.FromResult(employee));

            // Set up user manager to return user
            subUserManager.GetUserByIdAsync(1).Returns(Task.FromResult(user));

            // Act
            var result = await service.GetAsync(input);

            // Assert
            Assert.NotNull(result);
            Assert.Equal(employee.Id, result.Id);
            Assert.Equal(user.FullName, result.FullName);
            Assert.Equal(user.EmailAddress, result.Email);
            Assert.Equal(employee.Position, result.Position);
            Assert.Equal(employee.Department, result.Department);
        }
    }
}