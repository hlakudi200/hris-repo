using NSubstitute;
using System;
using System.Threading.Tasks;
using Xunit;
using hrisApi.Services.EmailService;
using hrisApi.Services.EmailService.DTO;

namespace hrisApi.Tests.Services.EmailService
{
    public class EmailAppServiceTests
    {
        private IEmailService subEmailService;

        public EmailAppServiceTests()
        {
            this.subEmailService = Substitute.For<IEmailService>();
        }

        private EmailAppService CreateService()
        {
            return new EmailAppService(this.subEmailService);
        }

        [Fact]
        public async Task SendEmail_WithValidRequest_CallsEmailService()
        {
            // Arrange  
            var service = this.CreateService();
            var request = new EmailRequestDto
            {
                To = "tsekitshabalala67@gmail.com",
                Subject = "Test Subject",
                Body = "Test Body"
            };

            // Act  
            await service.SendEmail(request);

            // Assert  
            await this.subEmailService.Received(1).SendEmailAsync(
                Arg.Is<EmailRequestDto>(r =>
                    r.To == request.To &&
                    r.Subject == request.Subject &&
                    r.Body == request.Body
                )
            );
        }
    }
}