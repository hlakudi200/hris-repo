using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using Abp.UI;
using hrisApi.Domains.Employee_Management;
using hrisApi.Services.Employee_Management.DTO;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        public EmployeeAppService(
            IRepository<Employee, Guid> repository,
            IRepository<EmployeeDocument, Guid> documentRepository)
            : base(repository)
        {
            _documentRepository = documentRepository;
            LocalizationSourceName = "hrisApi";
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
            string idPrefix = input.NationalIdNumber.Length >= 9 ? input.NationalIdNumber.Substring(6, 9) : input.NationalIdNumber;
            input.EmployeeNumber = $"{currentYear}/{idPrefix}";

            return await base.CreateAsync(input);
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

            return await base.UpdateAsync(input);
        }

        public override async Task<EmployeeDto> GetAsync(EntityDto<Guid> input)
        {
            var employee = await Repository.GetAllIncluding(e => e.Documents)
                .FirstOrDefaultAsync(e => e.Id == input.Id);

            if (employee == null)
            {
                throw new UserFriendlyException("Employee not found");
            }

            return ObjectMapper.Map<EmployeeDto>(employee);
        }

        public override async Task<PagedResultDto<EmployeeDto>> GetAllAsync(PagedEmployeeResultRequestDto input)
        {
            var query = Repository.GetAllIncluding(e => e.Documents);

            // Apply filtering
            if (!string.IsNullOrWhiteSpace(input.Keyword))
            {
                query = query.Where(e =>
                    e.User.Name.Contains(input.Keyword) ||
                    e.User.Surname.Contains(input.Keyword) ||
                    e.EmployeeNumber.Contains(input.Keyword) ||
                    e.NationalIdNumber.Contains(input.Keyword) ||
                    e.Position.Contains(input.Keyword) ||
                    e.Department.Contains(input.Keyword)
                );
            }

            if (!string.IsNullOrWhiteSpace(input.Department))
            {
                query = query.Where(e => e.Department == input.Department);
            }

            // Apply sorting
            if (!string.IsNullOrWhiteSpace(input.Sorting))
            {
                query = ApplySorting(query, input);
            }
            else
            {
                query = query.OrderBy(e => e.User.Name);
            }

            // Apply paging
            var totalCount = await query.CountAsync();
            var employees = await query
                .Skip(input.SkipCount)
                .Take(input.MaxResultCount)
                .ToListAsync();

            // Map to DTOs
            var employeeDtos = ObjectMapper.Map<List<EmployeeDto>>(employees);

            return new PagedResultDto<EmployeeDto>(totalCount, employeeDtos);
        }

        public async Task<ListResultDto<EmployeeListDto>> GetEmployeesAsync()
        {
            var employees = await Repository.GetAllListAsync();
            return new ListResultDto<EmployeeListDto>(
                ObjectMapper.Map<List<EmployeeListDto>>(employees)
            );
        }

        //Document management methods

        [Route("DocumentUpload")]
        public async Task<EmployeeDocumentDto> AddDocumentAsync([FromForm]CreateEmployeeDocumentDto input)
        {
            var employee = await Repository.GetAsync(input.EmployeeId);

            var document = new EmployeeDocument
            {
                EmployeeId = input.EmployeeId,
                DocumentType = input.DocumentType,
                FilePath = input.FilePath,
                UploadDate = DateTime.Now
            };

            await _documentRepository.InsertAsync(document);

            return ObjectMapper.Map<EmployeeDocumentDto>(document);
        }

        public async Task<ListResultDto<EmployeeDocumentDto>> GetEmployeeDocumentsAsync(EntityDto<Guid> input)
        {
            var documents = await _documentRepository
                .GetAll()
                .Where(d => d.EmployeeId == input.Id)
                .ToListAsync();

            return new ListResultDto<EmployeeDocumentDto>(
                ObjectMapper.Map<List<EmployeeDocumentDto>>(documents)
            );
        }

        public async Task DeleteDocumentAsync(EntityDto<Guid> input)
        {
            await _documentRepository.DeleteAsync(input.Id);
        }
    }
}
