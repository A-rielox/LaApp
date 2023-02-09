using System.ComponentModel.DataAnnotations;

namespace App.DTOs;

public class CreatePostDto
{
    [Required]
    [StringLength(30, ErrorMessage = "Your title is limited from {2} to {1} characters", MinimumLength = 5)]
    public string Title { get; set; }

    [Required]
    public string Category { get; set; }

    [Required]
    [StringLength(2000, ErrorMessage = "Your content is limited from {2} to {1} characters", MinimumLength = 30)]
    public string Content { get; set; }
}
