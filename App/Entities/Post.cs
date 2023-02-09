namespace App.Entities;

public class Post
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Category { get; set; }
    public string Content { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;



    public bool Public { get; set; }
    public bool Banned { get; set; }




    public AppUser CreatedBy { get; set; }
    public int CreatedById { get; set; }
}
