using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hrisApi.Services.AiRanking.DTO
{
    public class RankedResumeDto
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public double Score { get; set; }
    }
}
