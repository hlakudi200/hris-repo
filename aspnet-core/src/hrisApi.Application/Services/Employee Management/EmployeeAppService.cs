using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.Runtime.Validation;
using Abp.UI;
using hrisApi.Authorization.Users;
using hrisApi.Domains.Employee_Management;
using hrisApi.Services.EmailService;
using hrisApi.Services.EmailService.DTO;
using hrisApi.Services.Employee_Management.DTO;
using hrisApi.Services.Employee_Management.Helpers;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;


namespace hrisApi.Services.Employee_Management
{
    [AbpAuthorize]
    public class EmployeeAppService : AsyncCrudAppService<
        Employee,
        EmployeeDto,
        Guid,
        PagedEmployeeResultRequestDto,
        CreateEmployeeDto,
        UpdateEmployeeDto>
    {
        private readonly IRepository<EmployeeDocument, Guid> _documentRepository;
        private readonly UserManager _userManager;
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly EmailAppService _emailAppService;

        private readonly EmployeeManager _employeeManager;


        public EmployeeAppService(
            IWebHostEnvironment hostingEnvironment,
            EmployeeManager employeeManager,
            IRepository<Employee, Guid> repository,
            IRepository<EmployeeDocument, Guid> documentRepository,
            UserManager userManager,
            EmailAppService emailAppService)
            : base(repository)
        {
            _documentRepository = documentRepository;
            LocalizationSourceName = "hrisApi";
            _employeeManager = employeeManager;
            _userManager = userManager;
            _emailAppService = emailAppService;
            _hostingEnvironment = hostingEnvironment;
        }

        public override async Task<EmployeeDto> CreateAsync(CreateEmployeeDto input)
        {
            // Check if employee with same National ID already exists
            var existingEmployee = await Repository.FirstOrDefaultAsync(e => e.NationalIdNumber == input.NationalIdNumber);
            if (existingEmployee != null)
            {
                throw new UserFriendlyException("Employee with this National ID already exists");
            }

            // Generate employee number (Year/first 4 digits of IdNo)
            string currentYear = DateTime.Now.Year.ToString();
            string idPrefix = input.NationalIdNumber.Length >= 9 ? input.NationalIdNumber.Substring(0, 9) : input.NationalIdNumber;

            string employeeNumber = $"{currentYear}/{idPrefix}";
            string password = PasswordGenerator.GeneratePassword();

            Employee resultsEmployee = await _employeeManager.CreateEmployeeAsync(
                input.Name,
                 input.Surname,
                 input.Email,
                 input.Username,
                 password,
                 employeeNumber,
                 input.ContactNo,
                 input.DateOfBirth,
                 input.NationalIdNumber,
                 input.HireDate,
                 input.Position,
                 input.Department,
                 input.ManagerId

                 );

            await SendEmployeeCredentialsEmail(
            input.Email,
            input.Name,
            input.Username,
            password,
            input.Position,
            input.Department
        );

            var employeeDtoReturn = ObjectMapper.Map<EmployeeDto>(resultsEmployee);


            return employeeDtoReturn;
        }


        private async Task SendEmployeeCredentialsEmail(
        string employeeEmail,
        string employeeName,
        string username,
        string password,
        string position,
        string department)
        {
            try
            {

                string emailBody = $@"
            <html>
            <body style='font-family: Arial, sans-serif; line-height: 1.6;'>
                <div style='max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;'>
                    <h2 style='color: #333; border-bottom: 1px solid #eee; padding-bottom: 10px;'>Welcome to Ubuntu HR!</h2>
                    
                    <p>Dear {employeeName},</p>
                    
                    <p>Congratulations on joining our team as <strong>{position}</strong> in the <strong>{department}</strong> department.</p>
                    
                    <p>Below are your system credentials to access our HRIS platform:</p>
                    
                    <div style='background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 15px 0;'>
                        <p><strong>Username:</strong> {employeeEmail}</p>
                        <p><strong>Password:</strong> {password}</p>
                    </div>
                    
                    
                    <p>If you have any questions or need assistance, please contact your manager or the HR department.</p>
                    
                    <p>Best regards,<br>
                    Human Resources Department</p>
                </div>
            </body>
            </html>";

                // Create email request
                var emailRequest = new EmailRequestDto
                {
                    To = employeeEmail,
                    Subject = "Welcome to Ubuntu HR - Your Account Details",
                    Body = emailBody,
                    IsBodyHtml = true
                };

                // Send email
                await _emailAppService.SendEmail(emailRequest);

                Logger.Info($"Employee credentials email sent successfully to: {employeeEmail}");
            }
            catch (Exception ex)
            {
                // Log error but don't fail employee creation if email fails
                Logger.Error($"Failed to send employee credentials email: {ex.Message}", ex);
            }
        }


        public override async Task<EmployeeDto> UpdateAsync(UpdateEmployeeDto input)
        {
            // Check if National ID is being changed and if so, ensure it's unique
            var employee = await Repository.GetAsync(input.Id);
            if (employee.NationalIdNumber != input.NationalIdNumber)
            {
                var existingEmployee = await Repository.FirstOrDefaultAsync(e =>
                    e.NationalIdNumber == input.NationalIdNumber && e.Id != input.Id);
                if (existingEmployee != null)
                {
                    throw new UserFriendlyException("Employee with this National ID already exists");
                }
            }

            // Update employee number if National ID changed
            if (employee.NationalIdNumber != input.NationalIdNumber)
            {
                string currentYear = DateTime.Now.Year.ToString();
                string idPrefix = input.NationalIdNumber.Length >= 9 ?
                    input.NationalIdNumber.Substring(0, 9) : input.NationalIdNumber;
                input.EmployeeNumber = $"{currentYear}/{idPrefix}";
            }

            // Update employee using manager
            Employee updatedEmployee = await _employeeManager.UpdateEmployeeAsync(
                input.Id,
                input.Surname,
                input.Email,
                input.Position,
                input.Department,
                input.EmployeeNumber,
                input.NationalIdNumber,
                input.ContactNo


            );

            var employeeDtoReturn = ObjectMapper.Map<EmployeeDto>(updatedEmployee);
            return employeeDtoReturn;
        }


        //New
        public async Task<EmployeeDto> GetEmployeeByIdAsync(long userId)
        {
            var employee = await Repository.GetAll()
                .Include(e => e.User)
                .FirstOrDefaultAsync(e => e.UserId == userId);
            if (employee == null)
            {
                throw new UserFriendlyException("Employee not found");
            }
            var user = await _userManager.GetUserByIdAsync(employee.UserId);
            var employeeDto = new EmployeeDto
            {
                Id = employee.Id,
                FullName = user.FullName,
                Surname = user.Surname,
                Email = user.EmailAddress,
                EmployeeNumber = employee.EmployeeNumber,
                ContactNo = employee.ContactNo,
                DateOfBirth = employee.DateOfBirth,
                NationalIdNumber = employee.NationalIdNumber,
                HireDate = employee.HireDate,
                Position = employee.Position,
                Department = employee.Department,
                ManagerId = employee.ManagerId
            };
            return employeeDto;
        }


        public override async Task<EmployeeDto> GetAsync(EntityDto<Guid> input)
        {
            var employee = await Repository
                .FirstOrDefaultAsync(e => e.Id == input.Id);

            var user = await _userManager.GetUserByIdAsync(employee.UserId);

            if (employee == null && user == null)
            {
                throw new UserFriendlyException("Employee not found");
            }

            var employeeDto = new EmployeeDto
            {
                Id = employee.Id,
                FullName = user.FullName,
                Surname = user.Surname,
                Email = user.EmailAddress,
                EmployeeNumber = employee.EmployeeNumber,
                ContactNo = employee.ContactNo,
                DateOfBirth = employee.DateOfBirth,
                NationalIdNumber = employee.NationalIdNumber,
                HireDate = employee.HireDate,
                Position = employee.Position,
                Department = employee.Department,
                ManagerId = employee.ManagerId
            };

            return employeeDto;
        }


        public override async Task<PagedResultDto<EmployeeDto>> GetAllAsync(PagedEmployeeResultRequestDto input)
        {
            // Start with an Include for the User entity
            var query = Repository.GetAll().Include(e => e.User);


            // Apply paging
            var totalCount = await query.CountAsync();
            var employees = await query
                .Skip(input.SkipCount)
                .Take(input.MaxResultCount)
                .ToListAsync();

            // Map to DTOs
            var employeeDtos = ObjectMapper.Map<List<EmployeeDto>>(employees);


            foreach (var dto in employeeDtos)
            {
                var employee = employees.First(e => e.Id == dto.Id);
                dto.FullName = employee.User?.Name;
                dto.Surname = employee.User?.Surname;
                dto.Email = employee.User?.EmailAddress;
            }

            return new PagedResultDto<EmployeeDto>(totalCount, employeeDtos);
        }

        public async Task<List<EmployeeDto>> GetAllEmployees()
        {

            var employees = await Repository.GetAll().Include(e => e.User).ToListAsync();

            var results = ObjectMapper.Map<List<EmployeeDto>>(employees);

            return results;
        }




        //Document management methods

        [Route("DocumentUpload")]
        public async Task<EmployeeDocumentDto> AddDocumentAsync([FromForm] CreateEmployeeDocumentDto input)
        {
            try
            {
                // Validate the file
                ValidateFileUpload(input);

                // Create document entity
                var employeeDocument = new EmployeeDocument
                {

                    FileName = input.File.FileName,

                    FileExtension = Path.GetExtension(input.File.FileName),
                    FileSizeInBytes = input.File.Length,
                    FilePath = Path.Combine(_hostingEnvironment.WebRootPath, "uploads", "employee-documents", $"{Guid.NewGuid()}{Path.GetExtension(input.File.FileName)}")
                };

                // Create directory if it doesn't exist
                if (!Directory.Exists(Path.GetDirectoryName(employeeDocument.FilePath)))
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(employeeDocument.FilePath));
                }

                // Save physical file
                using (var stream = input.File.OpenReadStream())
                {
                    await SaveFile(employeeDocument.FilePath, stream);
                }

                // Save to database
                await _documentRepository.InsertAsync(employeeDocument);
                await CurrentUnitOfWork.SaveChangesAsync();

                // Map and return result
                return ObjectMapper.Map<EmployeeDocumentDto>(employeeDocument);
            }
            catch (UserFriendlyException ex)
            {
                throw ex;
            }
            catch (Exception ex)
            {
                Logger.Error("Error saving employee document", ex);
                throw new UserFriendlyException("Could not save document. Please try again.");
            }
        }

        private void ValidateFileUpload(CreateEmployeeDocumentDto input)
        {

            var allowedExtensions = new string[] { ".jpg", ".jpeg", ".png", ".pdf" };

            if (input.File == null)
            {
                throw new UserFriendlyException("file", "No file was uploaded");
            }

            if (!allowedExtensions.Contains(Path.GetExtension(input.File.FileName).ToLowerInvariant()))
            {
                throw new UserFriendlyException("file", "Unsupported file extension");
            }

            if (input.File.Length > 10485760) // 10MB limit
            {
                throw new UserFriendlyException("file", "File size more than 10MB. Please upload a smaller size file.");
            }
        }

        private async Task SaveFile(string filePath, Stream stream)
        {
            using (var fs = new FileStream(filePath, FileMode.Create))
            {
                await stream.CopyToAsync(fs);
            }
        }
        public async Task<ListResultDto<EmployeeDocumentDto>> GetEmployeeDocumentsAsync(EntityDto<Guid> input)
        {
            // Input validation
            if (input == null || input.Id == Guid.Empty)
            {
                throw new ArgumentException("Valid employee ID is required");
            }

            try
            {
                // Query documents
                var documents = await _documentRepository
                    .GetAllIncluding(d => d.FileName) // Include related entities if needed
                                                      //.Where(d => d.EmployeeId == input.Id)
                    .OrderByDescending(d => d.CreationTime)
                    .ToListAsync();

                // Map to DTOs
                var documentDtos = ObjectMapper.Map<List<EmployeeDocumentDto>>(documents);

                // Add download URLs
                foreach (var documentDto in documentDtos)
                {

                    documentDto.DownloadUrl = $"/api/services/app/EmployeeDocument/DownloadDocument?id={documentDto.Id}";
                }

                return new ListResultDto<EmployeeDocumentDto>(documentDtos);
            }
            catch (Exception ex)
            {
                Logger.Error($"Error retrieving documents for employee {input.Id}", ex);
                throw new UserFriendlyException("Could not retrieve employee documents. Please try again.");
            }
        }



        public async Task DeleteDocumentAsync(EntityDto<Guid> input)
        {
            await _documentRepository.DeleteAsync(input.Id);
        }


    }
}
