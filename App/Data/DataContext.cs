using App.Entities;
using Microsoft.EntityFrameworkCore;

namespace App.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<AppUser> Users { get; set; }
    public DbSet<UserLike> Likes { get; set; }



    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);


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
    }
}
