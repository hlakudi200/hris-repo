using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hrisApi.Services.EmailService.DTO
{
    public class EmailRequestDto
    {
        public required string To { get; set; }
        public required string Subject { get; set; }
        public required string Body { get; set; }
        public bool IsBodyHtml { get; set; } = true;

    }
}
