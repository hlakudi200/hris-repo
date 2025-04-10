using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Dependency;
using hrisApi.Services.EmailService.DTO;

namespace hrisApi.Services.EmailService
{
    public interface IEmailService : ITransientDependency
    {
        Task SendEmailAsync(EmailRequestDto request);
    }
}
