﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Abp.Domain.Entities.Auditing;
using hrisApi.Domains.Employee_Management;

namespace hrisApi.Domains.Payroll_Processing
{
    public class PayrollProfile : FullAuditedEntity<Guid>
    {
        public Guid EmployeeId { get; set; }
        [ForeignKey("EmployeeId")]
        public Employee Employee { get; set; }
        public decimal BasicSalary { get; set; }
        public decimal TaxRate { get; set; }
        [JsonIgnore]
        public ICollection<PayrollTransaction> Transactions { get; set; }

    }
}
