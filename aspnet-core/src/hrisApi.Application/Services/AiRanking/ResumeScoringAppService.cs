using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using hrisApi.Services.AiRanking.DTO;
using UglyToad.PdfPig;
using System.Net.Http.Json;
using Abp.Application.Services;
namespace hrisApi.Services.AiRanking
{
    public class ResumeScoringAppService : ApplicationService
    {
        //public async Task<List<RankedResumeDto>> RankResumesAsync(RankResumesInput input)
        //{
        //    var results = new List<RankedResumeDto>();

        //    foreach (var resume in input.Resumes)
        //    {
        //        var extractedText = ExtractTextFromPdf(resume.ResumePdf);
        //        var score = await GetResumeScoreFromDeepSeekAsync(extractedText, input.JobDescription);

        //        results.Add(new RankedResumeDto
        //        {
        //            FullName = resume.FullName,
        //            Email = resume.Email,
        //            Score = score
        //        });
        //    }

        //    return results.OrderByDescending(x => x.Score).ToList();
        //}

        public async Task<List<RankedResumeDto>> RankResumesAsync()
        {
            // Dummy job description for testing
            var jobDescription = "Looking for a C# backend developer with knowledge in ABP framework and REST APIs.";

            // Create dummy resumes for testing
            var resumes = new List<ResumeDto>
    {
        new ResumeDto
        {
            FullName = "Alice Johnson",
            Email = "alice@example.com",
            ResumeText = "Experienced C# developer with 3 years using ABP Zero and building RESTful services. Strong experience in ASP.NET Core and Web API design."
        },
        new ResumeDto
        {
            FullName = "Bob Smith",
            Email = "bob@example.com",
            ResumeText = "Frontend developer with expertise in React, Tailwind CSS, and modern JavaScript frameworks. Experienced in building beautiful, responsive user interfaces."
        },
        new ResumeDto
        {
            FullName = "Charlie Brown",
            Email = "charlie@example.com",
            ResumeText = "Full-stack developer with expertise in JavaScript, Node.js, Express, and MongoDB. Experience with Agile methodologies and team collaboration."
        },
        new ResumeDto
        {
            FullName = "David Wilson",
            Email = "david@example.com",
            ResumeText = "Backend developer with strong experience in C#, ASP.NET, and database design. Focus on building scalable APIs and enterprise applications."
        }
    };

            var results = new List<RankedResumeDto>();

            foreach (var resume in resumes)
            {
                // Prefer ResumeText if available, otherwise use PDF extraction (not needed in this test case)
                string resumeText = string.IsNullOrWhiteSpace(resume.ResumeText)
                    ? ExtractTextFromPdf(resume.ResumePdf)
                    : resume.ResumeText;

                // Call the DeepSeek model for ranking
                var score = await GetResumeScoreFromDeepSeekAsync(resumeText, jobDescription);

                results.Add(new RankedResumeDto
                {
                    FullName = resume.FullName,
                    Email = resume.Email,
                    Score = score
                });
            }

            // Return the sorted results by score (highest first)
            return results.OrderByDescending(x => x.Score).ToList();
        }


        private string ExtractTextFromPdf(byte[] pdfBytes)
        {
            using var stream = new MemoryStream(pdfBytes);
            using var document = PdfDocument.Open(stream);
            var text = new StringBuilder();

            foreach (var page in document.GetPages())
            {
                text.AppendLine(page.Text);
            }

            return text.ToString();
        }

        private async Task<double> GetResumeScoreFromDeepSeekAsync(string resumeText, string jobDescription)
        {
            var prompt = $"Given this job description:\n{jobDescription}\n\nRate the following resume out of 100 based on how well it matches:\n\n{resumeText}\n\nRespond with a number only.";

            var payload = new
            {
                model = "deepseek-chat",
                messages = new[] { new { role = "user", content = prompt } }
            };

            var client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", "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");
            client.DefaultRequestHeaders.Add("HTTP-Referer", "https://localhost:44311/");
            client.DefaultRequestHeaders.Add("X-Title", "ResumeRanker");

            try
            {
                var response = await client.PostAsJsonAsync("https://openrouter.ai/api/v1/chat/completions", payload);

                if (!response.IsSuccessStatusCode)
                {
                    throw new HttpRequestException($"Request failed with status code {response.StatusCode}");
                }

                var result = await response.Content.ReadFromJsonAsync<OpenRouterResponse>();
                var scoreText = result?.Choices?.FirstOrDefault()?.Message?.Content;

                return double.TryParse(scoreText, out var score) ? score : 0;
            }
            catch (HttpRequestException ex)
            {
                // Log or handle the 401 Unauthorized error
                Console.WriteLine($"Error: {ex.Message}");
                return 0; // Or handle as needed
            }
        }

        public class OpenRouterResponse
        {
            public List<OpenRouterChoice> Choices { get; set; }
        }

        public class OpenRouterChoice
        {
            public OpenRouterMessage Message { get; set; }
        }

        public class OpenRouterMessage
        {
            public string Content { get; set; }
        }


    }
}
