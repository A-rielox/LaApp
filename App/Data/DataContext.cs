using App.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace App.Data;

public class DataContext : IdentityDbContext<AppUser, AppRole, int,
                        IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>,
                        IdentityRoleClaim<int>, IdentityUserToken<int>>
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    //public DbSet<AppUser> Users { get; set; }
    public DbSet<UserLike> Likes { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Recipe> Recipes { get; set; }
    public DbSet<Post> Posts { get; set; }



    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        //--------
        //-------- p' roles usuario
        builder.Entity<AppUser>()
            .HasMany(u => u.UserRoles)
            .WithOne(aur => aur.User)
            .HasForeignKey(aur => aur.UserId)
            .IsRequired();

        builder.Entity<AppRole>()
            .HasMany(ar => ar.UserRoles)
            .WithOne(aur => aur.Role)
            .HasForeignKey(aur => aur.RoleId)
            .IsRequired();



        //--------
        //-------- p' UserLike
        builder.Entity<UserLike>()
            .HasKey(l => new { l.SourceUserId, l.TargetUserId }); // establece la primary-key en la tabla

        // un SourceUser puede tener varios LikedUsers
        builder.Entity<UserLike>()
            .HasOne(l => l.SourceUser)
            .WithMany(u => u.LikedUsers) // estas 2 me dicen que un sourceUser ( q puede ser lisa ) le pueden gustar varios users
            .HasForeignKey(l => l.SourceUserId)
            .OnDelete(DeleteBehavior.NoAction); // si borro un user => q NO se borren los likes

        // un LikedUser puede tener varios LikedByUsers
        builder.Entity<UserLike>()
            .HasOne(l => l.TargetUser)
            .WithMany(u => u.LikedByUsers) // ... un target user puede ser gustado por varios users
            .HasForeignKey(l => l.TargetUserId)
            .OnDelete(DeleteBehavior.NoAction);
        // si uso sqlServer => uno de los dos OnDelete debe ser distinto como OnDelete.NoAction




        //--------
        //-------- p' Message
        builder.Entity<Message>()
            .HasOne(m => m.Sender)
            .WithMany(u => u.MessagesSent)
            .OnDelete(DeleteBehavior.Restrict);

        // en ambas queda especificada la foreign key por convencion ( RecipientId y SenderId )

        builder.Entity<Message>()
            .HasOne(m => m.Recipient)
            .WithMany(u => u.MessagesReceived) 
            .OnDelete(DeleteBehavior.Restrict);




    }
}
