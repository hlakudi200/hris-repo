using Abp.Application.Services;
using Abp.Domain.Repositories;
using hrisApi.Domains.Payroll_Processing;
using hrisApi.Services.PayrollTransactionService.DTO;
using hrisApi.Services.PayrollTransactionService;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;

public class PayrollTransactionAppService : AsyncCrudAppService<PayrollTransaction, PayrollTransactionDto, Guid>, IPayrollTransactionAppService
{
    public PayrollTransactionAppService(IRepository<PayrollTransaction, Guid> repository) : base(repository)
    {
    }

    public override async Task<PayrollTransactionDto> CreateAsync(PayrollTransactionDto input)
    {
        // Calculate tax before creating the transaction
        if (input.TaxAmount <= 0)
        {
            // Calculate tax based on gross amount
            input.TaxAmount = CalculateTax(input.GrossAmount);

            // Calculate net amount
            input.NetAmount = input.GrossAmount - input.TaxAmount;
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


}