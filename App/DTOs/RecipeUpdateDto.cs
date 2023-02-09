using System.ComponentModel.DataAnnotations;

namespace App.DTOs;

public class RecipeUpdateDto
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Title { get; set; }

    [Required]
    public string Category { get; set; }

    [Required]
    public string Content { get; set; }

    [Required]
    public string OilsList { get; set; }
}
