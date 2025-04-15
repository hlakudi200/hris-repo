using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Domain.Entities.Auditing;

namespace hrisApi.Domains.Recruitment_Module
{
    public class OfferLetter : FullAuditedEntity<Guid>
    {
       
        public Guid JobApplicationId { get; set; }
        public DateTime OfferDate { get; set; }
        public string PositionOffered { get; set; }
        public decimal SalaryOffered { get; set; }
        public string LetterPath { get; set; }

    }
}
