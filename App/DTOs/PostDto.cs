namespace App.DTOs;

public class PostDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Category { get; set; }
    public string Content { get; set; }
    public DateTime Created { get; set; }

    /////////////////////
    public int CreatedById { get; set; }
    public string CreatedByUsername { get; set; }
    public string CreatedByPhotoUrl { get; set; }
}
