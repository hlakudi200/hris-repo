using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Build.Execution;

namespace hrisApi.Services.AiRanking.DTO
{
    public class ResumeDto
    {
        public string FullName { get; set; }
        public Guid ApplicantId { get; set; }
        public string Email { get; set; }
        public string ResumeText { get; set; }
        public byte[] ResumePdf { get; set; }
    }
}
