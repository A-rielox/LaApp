﻿using Microsoft.AspNetCore.Identity;

namespace App.Entities;

public class AppUser : IdentityUser<int>
{
    public string KnownAs { get; set; }
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public string Introduction { get; set; }
    public string Interests { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public List<Picture> Photos { get; set; } = new();


    ////////////////////////////
    // LIKES
    public List<UserLike> LikedByUsers { get; set; } // los q te dan like
    public List<UserLike> LikedUsers { get; set; } // a quienes les doy like
    // UserLike es la join-table
    // un SourceUser puede tener varios LikedUsers
    // un LikedUser puede tener varios LikedByUsers
    // la configuracion p' 2waybinding se hace en LA TABLA EN DataContext.cs



    ////////////////////////////
    // Messages
    public List<Msg> MessagesSent { get; set; }
    public List<Msg> MessagesReceived { get; set; }
    // Message es la join-table

    ////////////////////////////
    // User Roles
    // es la misma navigation-property hacia la join-table en AppUser.cs y AppRole.cs
    public ICollection<AppUserRole> UserRoles { get; set; }
    // AppUserRole es la join-table


    ////////////////////////////

    public List<Recipe> Recipes { get; set; } = new();



    ////////////////////////////

    public List<Post> Posts { get; set; } = new();



}
