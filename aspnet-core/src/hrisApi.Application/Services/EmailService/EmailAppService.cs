using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using hrisApi.Services.EmailService.DTO;

namespace hrisApi.Services.EmailService
{
    public class EmailAppService : ApplicationService
    {
        private readonly IEmailService _emailService;

        public EmailAppService(IEmailService emailService)
        {
            _emailService = emailService;
        }

        public async Task SendEmail(EmailRequestDto request)
        {
            await _emailService.SendEmailAsync(request);
        }
    }
}
