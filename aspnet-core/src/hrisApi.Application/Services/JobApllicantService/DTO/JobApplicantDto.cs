using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Domains.Recruitment_Module;

namespace hrisApi.Services.JobApllicantService.DTO
{
    [AutoMap(typeof(JobApplicant))]
    public class JobApplicantDto : EntityDto<Guid>
    {
        public long UserId { get; set; }
        public int NationalIdNo { get; set; }
        public string Gender { get; set; } = string.Empty;
        public DateTime DateofBirth { get; set; }
        public string CellphoneNo { get; set; } = string.Empty;
        public string AlternativePhone { get; set; } = string.Empty;
        public string AddressLine1 { get; set; } = string.Empty;
        public string AddressLine2 { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string Province { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string PostalCode { get; set; } = string.Empty;
        public string HighestQualification { get; set; } = string.Empty;
        public string FieldOfStudy { get; set; } = string.Empty;
        public string Institution { get; set; } = string.Empty;
        public DateTime GraduationYear { get; set; }
        public int YearsOfExperience { get; set; }
        public string CurrentEmployer { get; set; } = string.Empty;
        public string CurrentPosition { get; set; } = string.Empty;
        public decimal CurrentSalary { get; set; }
        public string ResumeUrl { get; set; } = string.Empty;
        public string Coverletter { get; set; } = string.Empty;
        public bool IsWillingToRelocate { get; set; }
        public bool HasCriminalRecord { get; set; }
    }
}
