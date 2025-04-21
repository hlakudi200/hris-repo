using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;
using hrisApi.Authorization.Users;

namespace hrisApi.Domains.Employee_Management
{
    public class Employee : FullAuditedEntity<Guid>
    {

        public string EmployeeNumber { get; set; } = string.Empty;  //Year/first 4 digits of IdNo

        public long UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }


        [Required]
        [Phone]
        [StringLength(10, ErrorMessage = " Please make sure is 10 digits")]
        public string ContactNo { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Date)]
        public DateTime DateOfBirth { get; set; }


        [Required]
        [StringLength(13, ErrorMessage = "Please make sure is 13 digits")]
        public string NationalIdNumber { get; set; } = string.Empty;


        [Required]
        [DataType(DataType.Date)]
        public DateTime HireDate { get; set; }


        [Required]
        [StringLength(50)]
        public string Position { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string Department { get; set; } = string.Empty;

        public Guid ManagerId { get; set; }

        public ICollection<EmployeeDocument> Documents { get; set; }
    }
}
