using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using hrisApi.Authorization.Users;
using hrisApi.Domains.Attendance_Management;
using hrisApi.Domains.Payroll_Processing;

namespace hrisApi.Domains.Employee_Management
{
    public class EmployeeManager : DomainService
    {
        private readonly UserManager _userManager;
        private readonly IRepository<Employee, Guid> _employeeRepository;
        private readonly IRepository<PayrollProfile, Guid> _payrollProfileRepository;
        private readonly IRepository<Leave, Guid> _leaveRepository;

        public EmployeeManager(UserManager userManager, IRepository<Employee, Guid> employeeRepository, IRepository<PayrollProfile, Guid> payrollProfileRepository, IRepository<Leave, Guid> leaveRepository)
        {
            _userManager = userManager;
            _employeeRepository = employeeRepository;
            _payrollProfileRepository = payrollProfileRepository;
            _leaveRepository = leaveRepository;
        }

        public async Task<Employee> CreateEmployeeAsync(
            string firstName,
            string surname,
            string emailAddress,
            string username,
            string password,

            string EmployeeNumber,
            string ContactNo,
            DateTime DateOfBirth,
            string NationalIdNumber,
            DateTime HireDate,
            string Position,
            string Department,
            Guid ManagerId,
            decimal basicSalary
            )
        {
            var user = new User
            {
                Name = firstName,
                Surname = surname,
                EmailAddress = emailAddress,
                UserName = username,
            };

            // TODO: Tenancy

            var userCreationResult = await _userManager.CreateAsync(user, password);
            if (!userCreationResult.Succeeded)
            {
                throw new UserFriendlyException("User creation failed");
            }

            if (Position == "HR Manager")
            {
                await _userManager.AddToRoleAsync(user, "hrManager");
            }
            else
            {
                await _userManager.AddToRoleAsync(user, "EMPLOYEE");
            }

            var employee = new Employee
            {

                UserId = user.Id,
                ContactNo = ContactNo,
                DateOfBirth = DateOfBirth,
                NationalIdNumber = NationalIdNumber,
                HireDate = HireDate,
                Position = Position,
                Department = Department,
                ManagerId = ManagerId,
                EmployeeNumber = EmployeeNumber,

            };

            await _employeeRepository.InsertAsync(employee);

            var payrollProfile = new PayrollProfile
            {
                EmployeeId = employee.Id,
                BasicSalary = basicSalary,
                TaxRate = 10
            };

            await _payrollProfileRepository.InsertAsync(payrollProfile);

            var leave = new Leave
            {
                EmployeeId = employee.Id,
                Annual = 5,
                Sick = 5,
                Study = 5,
                FamilyResponsibility = 5
            };

            await _leaveRepository.InsertAsync(leave);
            return employee;

        }

        //New
        public async Task<Employee> GetByEmployeeNoAsync(long userId)
        {
            var employee = await _employeeRepository.FirstOrDefaultAsync(e => e.UserId == userId);
            if (employee == null)
            {
                throw new UserFriendlyException("Employee not found");
            }
            return employee;
        }


        public async Task<Employee> GetAsync(Guid id)
        {
            var employee = await _employeeRepository.GetAsync(id);
            if (employee == null)
            {
                throw new UserFriendlyException("Employee not found");
            }
            return employee;
        }



        public async Task<Employee> GetByIdAsync(Guid id)
        {
            var employee = await _employeeRepository.GetAsync(id);
            if (employee == null)
            {
                throw new UserFriendlyException("Employee not found");
            }

            // Verify that the associated user exists
            var user = await _userManager.GetUserByIdAsync(employee.UserId);
            if (user == null)
            {
                throw new UserFriendlyException("Associated user record not found");
            }

            return employee;
        }

        public async Task<Employee> UpdateEmployeeAsync(
            Guid id,
            string surname = null,
            string email = null,
            string? position = null,
            string? department = null,
            string? employeeNumber = null,
            string? nationalIdNumber = null,
            string? contactNo = null
        )
        {
            // Get the employee
            var employee = await _employeeRepository.GetAsync(id);
            if (employee == null)
            {
                throw new UserFriendlyException("Employee not found");
            }

            // Update employee properties
            if (!string.IsNullOrEmpty(contactNo)) employee.ContactNo = contactNo;
            if (!string.IsNullOrEmpty(nationalIdNumber)) employee.NationalIdNumber = nationalIdNumber;
            if (!string.IsNullOrEmpty(position)) employee.Position = position;
            if (!string.IsNullOrEmpty(department)) employee.Department = department;
            if (!string.IsNullOrEmpty(employeeNumber)) employee.EmployeeNumber = employeeNumber;

            await _employeeRepository.UpdateAsync(employee);

            var user = await _userManager.GetUserByIdAsync(employee.UserId);

            if (!string.IsNullOrEmpty(surname)) user.Surname = surname;
            if (!string.IsNullOrEmpty(email)) user.EmailAddress = email;

            await _userManager.UpdateAsync(user);

            return employee;
        }

        public async Task<List<Employee>> GetAllAsync()
        {
            return await _employeeRepository.GetAllListAsync();
        }

        public async Task<List<Employee>> GetEmployeesAsync(
            string filter = null,
            string department = null,
            string position = null,
            Guid? managerId = null)
        {
            return await _employeeRepository.GetAllListAsync(e =>
                (string.IsNullOrEmpty(filter) ||
                    e.NationalIdNumber.Contains(filter) ||
                    e.EmployeeNumber.Contains(filter) ||
                    e.ContactNo.Contains(filter)) &&
                (string.IsNullOrEmpty(department) || e.Department == department) &&
                (string.IsNullOrEmpty(position) || e.Position == position) &&
                (!managerId.HasValue || e.ManagerId == managerId)
            );
        }
    }
}


