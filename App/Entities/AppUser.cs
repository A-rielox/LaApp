namespace App.Entities;

public class AppUser
{
    public int Id { get; set; }
    public string UserName { get; set; }


    public string Email { get; set; }


    public byte[] PasswordHash { get; set; }
    public byte[] PasswordSalt { get; set; }

    //////////////////////////////////////////


    // public DateTime DateOfBirth { get; set; } // quitar

    public string KnownAs { get; set; }

    // created
    public DateTime LastActive { get; set; } = DateTime.UtcNow;


    // public string Gender { get; set; } // quitar

    public string Introduction { get; set; }

    // lookingFor
    public string Interests { get; set; }


    public string City { get; set; }
    public string Country { get; set; }
    public List<Photo> Photos { get; set; } = new();


    ////////////////////////////
    // LIKES
    public List<UserLike> LikedByUsers { get; set; } // los q te dan like
    public List<UserLike> LikedUsers { get; set; } // a quienes les doy like

    // un SourceUser puede tener varios LikedUsers
    // un LikedUser puede tener varios LikedByUsers
    // la configuracion p' 2waybinding se hace en LA TABLA EN DataContext.cs



    ////////////////////////////
    // Messages

    public List<Message> MessagesSent { get; set; }
    public List<Message> MessagesReceived { get; set; }


    ////////////////////////////
    // User Roles
    // es la misma navigation-property hacia la join-table en AppUser.cs y AppRole.cs
    //public ICollection<AppUserRole> UserRoles { get; set; }


}
