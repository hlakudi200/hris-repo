using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hrisApi.Services.AiRanking.DTO
{
    public class RankResumesInput
    {
        public string JobDescription { get; set; }
        public List<ResumeDto> Resumes { get; set; }
    }
}
