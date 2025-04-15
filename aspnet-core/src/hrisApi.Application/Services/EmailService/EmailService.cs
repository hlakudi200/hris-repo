using System;
using System.Threading.Tasks;
using hrisApi.Configurations;
using hrisApi.Services.EmailService.DTO;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace hrisApi.Services.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly SmtpSettings _smtpSettings;

        public EmailService(IOptions<SmtpSettings> smtpSettings)
        {
            _smtpSettings = smtpSettings.Value;
        }

        public async Task SendEmailAsync(EmailRequestDto request)
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(_smtpSettings.FromName, _smtpSettings.FromAddress));
            email.To.Add(MailboxAddress.Parse(request.To));
            email.Subject = request.Subject;

            var bodyBuilder = new BodyBuilder
            {
                HtmlBody = request.IsBodyHtml ? request.Body : null,
                TextBody = request.IsBodyHtml ? null : request.Body
            };
            email.Body = bodyBuilder.ToMessageBody();

            using var client = new SmtpClient();
            await client.ConnectAsync(
                _smtpSettings.Server,
                _smtpSettings.Port,
                SecureSocketOptions.StartTls
            );
            await client.AuthenticateAsync(_smtpSettings.Username, _smtpSettings.Password);
            await client.SendAsync(email);
            await client.DisconnectAsync(true);
        }
    }

}
