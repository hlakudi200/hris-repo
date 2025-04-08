using System.ComponentModel.DataAnnotations;

namespace hrisApi.Users.Dto;

public class ChangeUserLanguageDto
{
    [Required]
    public string LanguageName { get; set; }
}