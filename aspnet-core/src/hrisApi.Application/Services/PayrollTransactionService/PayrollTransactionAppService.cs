using Abp.Application.Services;
using Abp.Domain.Repositories;
using hrisApi.Domains.Payroll_Processing;
using hrisApi.Services.PayrollTransactionService.DTO;
using hrisApi.Services.PayrollTransactionService;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using Abp.UI;
using hrisApi.Domains.Employee_Management;
using System.ComponentModel.Design;
using Abp.Application.Services.Dto;
using Abp;
using static System.Net.Mime.MediaTypeNames;
using System.IO;
using System.Xml.Linq;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Abp.Domain.Entities;
using Font = iTextSharp.text.Font;
using Microsoft.AspNetCore.Mvc;
using hrisApi.Services.EmailService;
using hrisApi.Services.EmailService.DTO;
using Microsoft.EntityFrameworkCore;
using Abp.EntityFrameworkCore.Repositories;


public class PayrollTransactionAppService : AsyncCrudAppService<PayrollTransaction, PayrollTransactionDto, Guid>, IPayrollTransactionAppService
{
    private readonly EmailAppService _emailAppService;
    private readonly IResourceService resourceService;

    public PayrollTransactionAppService(IRepository<PayrollTransaction, Guid> repository, EmailAppService emailAppService) : base(repository)
    {
        _emailAppService = emailAppService;
    }

    public override async Task<PayrollTransactionDto> CreateAsync(PayrollTransactionDto input)
    {
        // Calculate tax before creating the transaction
        if (input.GrossAmount > 0)
        {
            // Calculate tax based on gross amount
            input.TaxAmount = CalculateTax(input.GrossAmount);

            // Calculate net amount
            input.NetAmount = input.GrossAmount - input.TaxAmount;
        }
        else
        {

            throw new UserFriendlyException("Error: Check Gross Amount ");
        }


        // Call the base method to save the entity
        return await base.CreateAsync(input);
    }

    private decimal CalculateTax(decimal grossAmount)
    {
        // Apply a flat 15% tax rate to the gross amount
        decimal tax = grossAmount * 0.15m;

        // Round to 2 decimal places
        return Math.Round(tax, 2);
    }


    [HttpGet]
    [Route("api/payroll/download-pdf/{id}")]
    public async Task<FileDto> DownloadPayrollPdfAsync(Guid id)
    {
        var entity = await Repository.GetAsync(id);
        if (entity == null)
        {
            throw new EntityNotFoundException(typeof(PayrollTransaction), id);
        }

        var dto = MapToEntityDto(entity);
        var fileDto = GeneratePdf(dto);

        // Ensure the fileDto is being properly returned
        if (fileDto == null || fileDto.FileBytes == null || fileDto.FileBytes.Length == 0)
        {
            throw new UserFriendlyException("Error: PDF generation failed or empty.");
        }

        return fileDto;
    }
    private FileDto GeneratePdf(PayrollTransactionDto payroll)
    {
        using (var memoryStream = new MemoryStream())
        {
            Document document = new Document(PageSize.A4, 50, 50, 50, 50);
            PdfWriter writer = PdfWriter.GetInstance(document, memoryStream);
            document.Open();

            // Add title
            Paragraph title = new Paragraph("Payroll Transaction",
                new Font(Font.FontFamily.HELVETICA, 18, Font.BOLD));
            title.Alignment = Element.ALIGN_CENTER;
            title.SpacingAfter = 20;
            document.Add(title);

            // Add transaction details table
            PdfPTable table = new PdfPTable(2);
            table.WidthPercentage = 100;
            table.SetWidths(new float[] { 1f, 2f });

            // Add rows
            AddTableRow(table, "Transaction ID:", payroll.Id.ToString());
            // Add employee name if you have it in your DTO
            // AddTableRow(table, "Employee Name:", payroll.EmployeeName);
            AddTableRow(table, "Gross Amount:", payroll.GrossAmount.ToString("C"));
            AddTableRow(table, "Tax Amount:", payroll.TaxAmount.ToString("C"));
            AddTableRow(table, "Net Amount:", payroll.NetAmount.ToString("C"));

            document.Add(table);
            document.Close();

            // Create file DTO for download
            return new FileDto
            {
                FileName = $"Payroll_{payroll.Id}_{DateTime.Now:yyyyMMdd}.pdf",
                ContentType = "application/pdf",
                FileBytes = memoryStream.ToArray()
            };
        }
    }

    private void AddTableRow(PdfPTable table, string label, string value)
    {
        PdfPCell cell1 = new PdfPCell(new Phrase(label, new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD)));
        cell1.Border = Rectangle.NO_BORDER;
        cell1.HorizontalAlignment = Element.ALIGN_LEFT;
        cell1.PaddingBottom = 8f;

        PdfPCell cell2 = new PdfPCell(new Phrase(value, new Font(Font.FontFamily.HELVETICA, 12)));
        cell2.Border = Rectangle.NO_BORDER;
        cell2.HorizontalAlignment = Element.ALIGN_LEFT;
        cell2.PaddingBottom = 8f;

        table.AddCell(cell1);
        table.AddCell(cell2);
    }

    public async Task<FileDto> GeneratePayrollPdf(Guid id)
    {
        // Ensure transaction exists
        var exists = await Repository.FirstOrDefaultAsync(t => t.Id == id);
        if (exists is null)
        {
            throw new UserFriendlyException("Payroll transaction not found");
        }

        // Generate the PDF using the updated method
        var pdfBytes = await CreatePayrollPdf(id);

        // Create a unique filename
        var fileName = $"Payroll_{id}_{DateTime.Now:yyyyMMdd}.pdf";

        // Return as FileDto
        return new FileDto(fileName, "application/pdf", pdfBytes);
    }


    private async Task<byte[]> CreatePayrollPdf(Guid payrollTransactionId)
    {
        var transaction = await Repository
            .GetAllIncluding(t => t.PayrollProfile, t => t.PayrollProfile.Employee, t => t.PayrollProfile.Employee.User)
            .FirstOrDefaultAsync(t => t.Id == payrollTransactionId);

        if (transaction == null)
            throw new UserFriendlyException("Transaction not found.");

        using (var memoryStream = new MemoryStream())
        {
            var document = new Document(PageSize.A4, 50, 50, 50, 50);
            PdfWriter.GetInstance(document, memoryStream);
            document.Open();

            var titleFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 18);
            var normalFont = FontFactory.GetFont(FontFactory.HELVETICA, 12);
            var boldFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 12);

            var title = new Paragraph("Payroll Transaction Receipt", titleFont)
            {
                Alignment = Element.ALIGN_CENTER,
                SpacingAfter = 20
            };
            document.Add(title);

            // Get the employee full name
            var employeeUser = transaction.PayrollProfile?.Employee?.User;
            string fullName = employeeUser != null
                ? $"{employeeUser.Name} {employeeUser.Surname}"
                : "Unknown Employee";

            var employeePara = new Paragraph
        {
            new Chunk("Employee: ", boldFont),
            new Chunk(fullName, normalFont)
        };
            document.Add(employeePara);

            var datePara = new Paragraph
        {
            new Chunk("Date: ", boldFont),
            new Chunk(DateTime.Now.ToString("dd/MM/yyyy"), normalFont)
        };
            document.Add(datePara);

            document.Add(new Paragraph(" "));

            // Table with transaction details
            var table = new PdfPTable(2) { WidthPercentage = 80 };

            table.AddCell(new PdfPCell(new Phrase("Description", boldFont)) { BackgroundColor = new BaseColor(240, 240, 240) });
            table.AddCell(new PdfPCell(new Phrase("Amount", boldFont)) { BackgroundColor = new BaseColor(240, 240, 240), HorizontalAlignment = Element.ALIGN_RIGHT });

            AddTableRow(table, "Transaction ID", transaction.Id.ToString(), normalFont);
            AddTableRow(table, "Gross Amount", transaction.GrossAmount.ToString("C"), normalFont);
            AddTableRow(table, "Tax Amount", transaction.TaxAmount.ToString("C"), normalFont);
            AddTableRow(table, "Net Amount", transaction.NetAmount.ToString("C"), boldFont);

            table.AddCell(new PdfPCell(new Phrase("")) { Colspan = 2, BorderWidthBottom = 1, Border = Rectangle.NO_BORDER, PaddingBottom = 5 });
            document.Add(table);

            document.Add(new Paragraph(" "));
            var notesPara = new Paragraph("This is an official payroll receipt. Tax rate applied: 15%", FontFactory.GetFont(FontFactory.HELVETICA, 10, iTextSharp.text.Font.ITALIC));
            document.Add(notesPara);

            document.Close();
            return memoryStream.ToArray();
        }
    }

    private void AddTableRow(PdfPTable table, string description, string amount, Font font)
    {
        // Description column (left aligned)
        var cell1 = new PdfPCell(new Phrase(description, font))
        {
            HorizontalAlignment = Element.ALIGN_LEFT,
            BorderWidth = 0,
            PaddingTop = 5,
            PaddingBottom = 5
        };

        // Amount column (right aligned)
        var cell2 = new PdfPCell(new Phrase(amount, font))
        {
            HorizontalAlignment = Element.ALIGN_RIGHT,
            BorderWidth = 0,
            PaddingTop = 5,
            PaddingBottom = 5
        };

        table.AddCell(cell1);
        table.AddCell(cell2);
    }


    [HttpPost]
    [Route("api/payroll/send-payslip-email/{id}")]
    public async Task<SendEmailResultDto> SendPayslipByEmailAsync(Guid id)
    {
        try
        {

            var transaction = await Repository
                .GetAllIncluding(t => t.PayrollProfile, t => t.PayrollProfile.Employee, t => t.PayrollProfile.Employee.User)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (transaction == null)
                throw new UserFriendlyException("Payroll transaction not found.");

            var employeeUser = transaction.PayrollProfile?.Employee?.User;
            if (employeeUser == null)
                throw new UserFriendlyException("Employee information not found for this payroll transaction.");

            var employeeEmail = employeeUser.EmailAddress;
            if (string.IsNullOrWhiteSpace(employeeEmail))
                throw new UserFriendlyException("Employee email address not found.");


            var pdfBytes = await CreatePayrollPdf(id);


            if (pdfBytes == null || pdfBytes.Length == 0)
                throw new UserFriendlyException("Failed to generate the PDF attachment.");

            Logger.Info($"Generated PDF with {pdfBytes.Length} bytes");


            var fileName = $"Payslip_{id}_{DateTime.Now:yyyyMMdd}.pdf";


            string htmlBody = $@"
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                    .header {{ background-color: #f8f9fa; padding: 15px; border-bottom: 1px solid #ddd; }}
                    .content {{ padding: 20px 0; }}
                    .footer {{ font-size: 12px; color: #777; border-top: 1px solid #ddd; padding-top: 15px; margin-top: 20px; }}
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='header'>
                        <h2>Your Payslip</h2>
                    </div>
                    <div class='content'>
                        <p>Dear <strong>{employeeUser.Name}</strong>,</p>
                        <p>Your payslip for the transaction dated <strong>{DateTime.UtcNow:yyyy-MM-dd}</strong> is attached to this email.</p>
                        <p>Please find the PDF attachment with your payslip details. If you have any questions regarding your payment, please contact the HR department.</p>
                    </div>
                    <div class='footer'>
                        <p>Thank you,<br>HR Department</p>
                        <p><small>This is an automated email, please do not reply.</small></p>
                    </div>
                </div>
            </body>
            </html>";


            var emailDto = new EmailRequestDto
            {
                To = employeeEmail,
                Subject = "Your Payslip",
                Body = htmlBody,
                IsBodyHtml = true,
                Attachments = new List<EmailAttachmentDto>
            {
                new EmailAttachmentDto
                {
                    FileName = fileName,
                    FileBytes = pdfBytes,
                    ContentType = "application/pdf"
                }
            }
            };


            Logger.Info($"Sending payslip email to {employeeEmail} with PDF attachment ({pdfBytes.Length} bytes)");


            await _emailAppService.SendEmail(emailDto);

            return new SendEmailResultDto
            {
                Success = true,
                Message = $"Payslip successfully sent to {employeeEmail}",
                SentTo = employeeEmail,
                SentDate = DateTime.UtcNow,
                AttachmentSize = pdfBytes.Length,
                AttachmentName = fileName
            };
        }
        catch (Exception ex)
        {
            Logger.Error($"Error sending payslip email: {ex.Message}", ex);

            return new SendEmailResultDto
            {
                Success = false,
                Message = $"Failed to send payslip: {ex.Message}"
            };
        }
    }


    [HttpPost]
    [Route("api/payroll/send-payslips-for-date")]
    public async Task<List<SendEmailResultDto>> SendPayslipsToAllEmployeesForDateAsync(DateTime date)
    {
        var results = new List<SendEmailResultDto>();

        // Get all payroll profiles including user info
        var payrollProfiles = await Repository
            .GetDbContext()
            .Set<PayrollProfile>()
            .Include(p => p.Employee)
            .ThenInclude(e => e.User)
            .ToListAsync();

        foreach (var profile in payrollProfiles)
        {
            try
            {
                if (profile.Employee == null || profile.Employee.User == null)
                    continue;


                decimal grossAmount = profile.BasicSalary;
                decimal taxAmount = CalculateTax(grossAmount);
                decimal netAmount = grossAmount - taxAmount;

                var transaction = new PayrollTransaction
                {
                    Id = Guid.NewGuid(),
                    PayrollProfileId = profile.Id,
                    GrossAmount = grossAmount,
                    TaxAmount = taxAmount,
                    NetAmount = netAmount,
                    PeriodStart = date,
                    PeriodEnd = date.AddDays(30),
                    CreationTime = date,

                };

                await Repository.InsertAsync(transaction);
                await CurrentUnitOfWork.SaveChangesAsync();


                var result = await SendPayslipByEmailAsync(transaction.Id);
                results.Add(result);
            }
            catch (Exception ex)
            {
                Logger.Error($"Failed to send payslip for profile {profile.Id}: {ex.Message}", ex);
                results.Add(new SendEmailResultDto
                {
                    Success = false,
                    Message = $"Failed for profile {profile.Id}: {ex.Message}"
                });
            }
        }

        return results;
    }


    public async Task<List<PayrollTransactionDto>> GetAllPayrollTrasactionsAsync()
    {
        var query = await Repository.GetAllAsync();
        var transactions = await query.ToListAsync();
        var results = ObjectMapper.Map<List<PayrollTransactionDto>>(transactions);

        return results;
    }


}




