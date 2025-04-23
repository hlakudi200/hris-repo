using System;

namespace hrisApi.Domains.Employee_Management.Helpers
{
    public static class TaxCalculator
    {
        public static decimal GetAnnualTaxRate(decimal basicSalary)
        {
            decimal annualIncome = basicSalary * 12;
            if (basicSalary <= 0)
            {
                return 0;
            }

            var taxAmount = CalculateAnnualTax(annualIncome);
            var taxRate = (taxAmount / annualIncome) * 100;
            return Math.Truncate(taxRate);
        }

        public static decimal CalculateAnnualTax(decimal taxableIncome)
        {
            switch (taxableIncome)
            {
                case <= 237_100:
                    return taxableIncome * 0.18m;

                case <= 370_500:
                    return 42_678 + (taxableIncome - 237_100) * 0.26m;
                case <= 512_800:
                    return 77362 + (taxableIncome - 370_500) * 0.31m;
                case <= 673_000:
                    return 121_475 + (taxableIncome - 512_800) * 0.36m;
                case <= 857_900:
                    return 179_147 + (taxableIncome - 673_00) * 0.39m;
                case <= 1_817_000:
                    return 251_258 + (taxableIncome - 857_900) * 0.41m;
                default:
                    return 644_489 + (taxableIncome - 1_817_000) * 0.45m;
            }
        }
    }
}
