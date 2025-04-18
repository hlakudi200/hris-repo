﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using hrisApi.Domains.Employee_Management;

namespace hrisApi.Services.Employee_Management.DTO
{
    [AutoMapFrom(typeof(EmployeeDocument))]
    [AutoMapTo(typeof(EmployeeDocument))]
    public class EmployeeDocumentDto : EntityDto<Guid>
    {
        public Guid EmployeeId { get; set; }
        public string DocumentType { get; set; }
        public string FilePath { get; set; }
        public DateTime UploadDate { get; set; }


        public string FileName { get; set; }
        public string ContentType { get; set; }
        public long FileSize { get; set; }
        public string DownloadUrl { get; set; }
    }
}
