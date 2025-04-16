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


public class PayrollTransactionAppService : AsyncCrudAppService<PayrollTransaction, PayrollTransactionDto, Guid>, IPayrollTransactionAppService
{

    private readonly IResourceService resourceService;

    public PayrollTransactionAppService(IRepository<PayrollTransaction, Guid> repository) : base(repository)
    {
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
        // Get the payroll transaction
        var payrollTransaction = await Repository.GetAsync(id);
        if (payrollTransaction == null)
        {
            throw new UserFriendlyException("Payroll transaction not found");
        }

        var payrollDto = ObjectMapper.Map<PayrollTransactionDto>(payrollTransaction);

        // Generate PDF
        var pdfBytes = CreatePayrollPdf(payrollDto);

        // Create a unique filename
        var fileName = $"Payroll_{id}_{DateTime.Now:yyyyMMdd}.pdf";

        // Return file using ABP's FileDto
        return new FileDto(fileName, "application/pdf", pdfBytes);
    }

    private byte[] CreatePayrollPdf(PayrollTransactionDto payroll)
    {
        using (var memoryStream = new MemoryStream())
        {
            // Create document and writer
            var document = new Document(PageSize.A4, 50, 50, 50, 50);
            var writer = PdfWriter.GetInstance(document, memoryStream);

            document.Open();

            // Add title
            var titleFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 18);
            var title = new Paragraph("Payroll Transaction Receipt", titleFont);
            title.Alignment = Element.ALIGN_CENTER;
            title.SpacingAfter = 20;
            document.Add(title);

            // Add transaction details
            var normalFont = FontFactory.GetFont(FontFactory.HELVETICA, 12);
            var boldFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 12);

            // Transaction ID
            var idPara = new Paragraph();
            idPara.Add(new Chunk("Transaction ID: ", boldFont));
            idPara.Add(new Chunk(payroll.Id.ToString(), normalFont));
            document.Add(idPara);

            // Employee info - assuming these properties exist in your DTO
            if (!string.IsNullOrEmpty(payroll.EmployeeName))
            {
                var employeePara = new Paragraph();
                employeePara.Add(new Chunk("Employee: ", boldFont));
                employeePara.Add(new Chunk(payroll.EmployeeName, normalFont));
                document.Add(employeePara);
            }

            // Date (if exists in your entity)
            //if (payroll.TransactionDate.HasValue)
            //{
            //    var datePara = new Paragraph();
            //    datePara.Add(new Chunk("Date: ", boldFont));
            //    datePara.Add(new Chunk(payroll.TransactionDate.Value.ToString("dd/MM/yyyy"), normalFont));
            //    document.Add(datePara);
            //}
            if (!string.IsNullOrEmpty(payroll.TransactionDate))
            {
                var datePara = new Paragraph();
                datePara.Add(new Chunk("Date: ", boldFont));
                datePara.Add(new Chunk(DateTime.Parse(payroll.TransactionDate).ToString("dd/MM/yyyy"), normalFont));
                document.Add(datePara);
            }
            else
            {
                var datePara = new Paragraph();
                datePara.Add(new Chunk("Date: ", boldFont));
                datePara.Add(new Chunk(DateTime.Now.ToString("dd/MM/yyyy"), normalFont));
                document.Add(datePara);
            }

            // Add spacing
            document.Add(new Paragraph(" "));

            // Create a table for the financial details
            var table = new PdfPTable(2) { WidthPercentage = 80 };

            // Add table headers
            var cell1 = new PdfPCell(new Phrase("Description", boldFont));
            var cell2 = new PdfPCell(new Phrase("Amount", boldFont));

            cell1.HorizontalAlignment = Element.ALIGN_LEFT;
            cell2.HorizontalAlignment = Element.ALIGN_RIGHT;

            table.AddCell(cell1);
            table.AddCell(cell2);

            // Add financial data rows
            AddTableRow(table, "Gross Amount", payroll.GrossAmount.ToString("C"), normalFont);
            AddTableRow(table, "Tax Amount", payroll.TaxAmount.ToString("C"), normalFont);

            // Add a separator line
            var separatorCell = new PdfPCell(new Phrase(""));
            separatorCell.Colspan = 2;
            separatorCell.BorderWidthBottom = 1;
            separatorCell.BorderWidthTop = 0;
            separatorCell.BorderWidthLeft = 0;
            separatorCell.BorderWidthRight = 0;
            separatorCell.PaddingBottom = 5;
            table.AddCell(separatorCell);

            // Add net amount in bold
            AddTableRow(table, "Net Amount", payroll.NetAmount.ToString("C"), boldFont);

            document.Add(table);

            // Add notes or footer
            document.Add(new Paragraph(" "));
            document.Add(new Paragraph(" "));
            var notesPara = new Paragraph("This is an official payroll receipt. Tax rate applied: 15%", FontFactory.GetFont(FontFactory.HELVETICA, 10, iTextSharp.text.Font.ITALIC));
            document.Add(notesPara);

            document.Close();

            return memoryStream.ToArray();
        }
    }

    private void AddTableRow(PdfPTable table, string description, string amount, iTextSharp.text.Font font)
    {
        var cell1 = new PdfPCell(new Phrase(description, font));
        var cell2 = new PdfPCell(new Phrase(amount, font));

        cell1.HorizontalAlignment = Element.ALIGN_LEFT;
        cell2.HorizontalAlignment = Element.ALIGN_RIGHT;

        cell1.BorderWidth = 0;
        cell2.BorderWidth = 0;

        cell1.PaddingTop = 5;
        cell1.PaddingBottom = 5;
        cell2.PaddingTop = 5;
        cell2.PaddingBottom = 5;

        table.AddCell(cell1);
        table.AddCell(cell2);
    }



}




// Define a simple DTO for file downloads
//public class FileDto
//{
//    //public string FileName { get; set; }
//    //public string FileType { get; set; }
//    //public byte[] FileContent { get; set; }


//    /// <summary>
//    /// File name including extension.
//    /// </summary>
//    public string FileName { get; set; }

//    /// <summary>
//    /// MIME type of the file.
//    /// </summary>
//    public string ContentType { get; set; }

//    /// <summary>
//    /// File content as byte array.
//    /// </summary>
//    public byte[] FileBytes { get; set; }

//    /// <summary>
//    /// File size in bytes.
//    /// </summary>
//    public long FileSize => FileBytes?.Length ?? 0;

//    public FileDto()
//    {
//    }

//    public FileDto(string fileName, string contentType)
//    {
//        FileName = fileName;
//        ContentType = contentType;
//    }

//    public FileDto(string fileName, string contentType, byte[] fileBytes)
//    {
//        FileName = fileName;
//        ContentType = contentType;
//        FileBytes = fileBytes;
//    }
//}

// DTO for date range inputs
//public class PayrollDateRangeDto
//{
//    public DateTime StartDate { get; set; }
//    public DateTime EndDate { get; set; }
//}
