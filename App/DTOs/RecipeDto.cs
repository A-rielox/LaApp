using App.Entities;

namespace App.DTOs;

public class RecipeDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Category { get; set; }
    public string Content { get; set; }
    public string OilsList { get; set; }
    public DateTime Created { get; set; }

    /////////////////////

    public bool Public { get; set; }
    public bool Banned { get; set; }

    /////////////////////

    public int CreatedById { get; set; }
    public string CreatedByUsername { get; set; }
    public string CreatedByPhotoUrl { get; set; }
}



//  public int Id { get; set; }
//  public string Title { get; set; }
//  public string Category { get; set; }
//  public string Content { get; set; }
//  public string OilsList { get; set; }
//  public DateTime Created { get; set; } = DateTime.UtcNow;
    
//  public bool Public { get; set; }
//  public bool Banned { get; set; }
    
//  public AppUser CreatedBy { get; set; }
//  public int CreatedById { get; set; }