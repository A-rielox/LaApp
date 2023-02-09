﻿using Microsoft.AspNetCore.Identity;

namespace App.Entities;

public class AppUserRole : IdentityUserRole<int>
{
    public AppUser User { get; set; }
    public AppRole Role { get; set; }
}

// join-table entre user y role
