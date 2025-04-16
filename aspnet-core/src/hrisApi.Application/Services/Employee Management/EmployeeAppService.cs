using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;
using Abp.Runtime.Validation;
using Abp.UI;
using hrisApi.Authorization.Users;
using hrisApi.Domains.Employee_Management;
using hrisApi.Services.Employee_Management.DTO;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;


namespace hrisApi.Services.Employee_Management
{
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

        private readonly EmployeeManager _employeeManager;


        public EmployeeAppService(
            IWebHostEnvironment hostingEnvironment,
            EmployeeManager employeeManager,
            IRepository<Employee, Guid> repository,
            IRepository<EmployeeDocument, Guid> documentRepository,
            UserManager userManager)
            : base(repository)
        {
            _documentRepository = documentRepository;
            LocalizationSourceName = "hrisApi";
            _employeeManager = employeeManager;
            _userManager = userManager;
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
            input.EmployeeNumber = $"{currentYear}/{idPrefix}";

            Employee resultsEmployee = await _employeeManager.CreateEmployeeAsync(
                input.Name,
                 input.Surname,
                 input.Email,
                 input.Username,
                 input.Password,
                 input.EmployeeNumber,
                 input.ContactNo,
                 input.DateOfBirth,
                 input.NationalIdNumber,
                 input.HireDate,
                 input.Position,
                 input.Department,
                 input.ManagerId

                 );

            var employeeDtoReturn = ObjectMapper.Map<EmployeeDto>(resultsEmployee);


            return employeeDtoReturn;
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
                //input.Name,
                //input.Surname,
                //input.Email,
                //input.Username,
                //input.Password,
                
                
                //input.DateOfBirth,
               
                //input.HireDate,
                input.Position,
                input.Department,
                input.EmployeeNumber,
                 input.NationalIdNumber,
                 input.ContactNo
                //input.ManagerId


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

            // Apply filtering
            //if (!string.IsNullOrWhiteSpace(input.Keyword))
            //{
            //    query = query.Where(e =>
            //        e.User.Name.Contains(input.Keyword) ||
            //        e.User.Surname.Contains(input.Keyword) ||
            //        e.EmployeeNumber.Contains(input.Keyword) ||
            //        e.NationalIdNumber.Contains(input.Keyword) ||
            //        e.Position.Contains(input.Keyword) ||
            //        e.Department.Contains(input.Keyword)
            //    );
            //}

            // Additional filters for the new properties
            //if (!string.IsNullOrWhiteSpace(input.FullName))
            //{
            //    query = query.Where(e => e.User.Name.Contains(input.FullName));
            //}

            //if (!string.IsNullOrWhiteSpace(input.Surname))
            //{
            //    query = query.Where(e => e.User.Surname.Contains(input.Surname));
            //}

            //if (!string.IsNullOrWhiteSpace(input.Email))
            //{
            //    query = query.Where(e => e.User.EmailAddress.Contains(input.Email));
            //}

            //if (!string.IsNullOrWhiteSpace(input.Position))
            //{
            //    query = query.Where(e => e.Position.Contains(input.Position));
            //}

            //if (!string.IsNullOrWhiteSpace(input.Department))
            //{
            //    query = query.Where(e => e.Department == input.Department);
            //}

            //// Apply sorting
            //if (!string.IsNullOrWhiteSpace(input.Sorting))
            //{
            //    query = ApplySorting(query, input);
            //}
            //else
            //{
            //    query = query.OrderBy(e => e.User.Name);
            //}

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
