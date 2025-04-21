using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hrisApi.Services.JobApplicationService.DTO
{
    public class ApplicantContactDto
    {
        public Guid ApplicationId { get; set; }
        public string ApplicantName { get; set; }
        public string Email { get; set; }
    }
}
