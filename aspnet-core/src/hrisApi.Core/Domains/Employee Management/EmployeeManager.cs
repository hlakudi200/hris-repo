using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Repositories;
using Abp.Domain.Services;
using Abp.UI;
using hrisApi.Authorization.Users;

namespace hrisApi.Domains.Employee_Management
{
    public class EmployeeManager : DomainService
    {
        private readonly UserManager _userManager;
        private readonly IRepository<Employee, Guid> _employeeRepository;

        public EmployeeManager(UserManager userManager, IRepository<Employee, Guid> employeeRepository)
        {
            _userManager = userManager;
            _employeeRepository = employeeRepository;
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
            Guid ManagerId
            
         
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

            return employee;

        }
    }
}
