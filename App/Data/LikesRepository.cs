using Microsoft.EntityFrameworkCore;
using App.DTOs;
using App.Entities;
using App.Extensions;
using App.Helpers;
using App.Interfaces;

namespace App.Data;

public class LikesRepository : ILikesRepository
{
    private readonly DataContext _context;

    public LikesRepository(DataContext context)
	{
        _context = context;
    }



    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<UserLike> GetUserLike(int sourceUserId, int targetUserId)
    {
        // devuelve un like determinado
        var like = await _context.Likes.FindAsync(sourceUserId, targetUserId);

        return like;
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    // el id puede ser del sourceUser y serian los q ese user ha dado like
    // puede ser el targetId y serian los likes q ese user ha dado
    // SERIA los users que ese user a dado like o quienes le han dado like
    //public async Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams)
    //{
    //    var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
    //    var likes = _context.Likes.AsQueryable();

    //    // para los q este user ha dado like
    //    if (likesParams.Predicate == "liked")
    //    {
    //        likes = likes.Where(l => l.SourceUserId == likesParams.UserId);
    //        users = likes.Select(l => l.TargetUser);
    //    }

    //    // los q le han dado like al user actual
    //    if (likesParams.Predicate == "likedBy")
    //    {
    //        likes = likes.Where(l => l.TargetUserId == likesParams.UserId);
    //        users = likes.Select(l => l.SourceUser);
    //    }

    //    var likedUsers = users.Select(u => new LikeDto
    //    {
    //        UserName = u.UserName,
    //        KnownAs = u.KnownAs,
    //        PhotoUrl = u.Photos.FirstOrDefault(p => p.IsMain).Url,
    //        City = u.City,
    //        Country= u.Country,
    //        Id = u.Id,
    //    });

    //    var pagedList = await PagedList<LikeDto>.CreateAsync(likedUsers,
    //            likesParams.PageNumber, likesParams.PageSize);

    //    return pagedList;
    //}

    public async Task<IEnumerable<LikeDto>> GetUserLikes(string predicate, int userId)
    {
        var users = _context.Users.OrderBy(u => u.UserName).AsQueryable();
        var likes = _context.Likes.AsQueryable();

        // para los q este user ha dado like
        if (predicate == "liked")
        {
            likes = likes.Where(l => l.SourceUserId == userId);
            // se supone que selecciona los users que estan dentro de la lista anterior de likes
            users = likes.Select(l => l.TargetUser); 
        }

        // los q le han dado like al user actual
        if (predicate == "likedBy")
        {
            likes = likes.Where(l => l.TargetUserId == userId);
            users = likes.Select(l => l.SourceUser);
        }

        var likedUsers = await users.Select(u => new LikeDto
        {
            UserName = u.UserName,
            KnownAs = u.KnownAs,
            PhotoUrl = u.Photos.FirstOrDefault(p => p.IsMain).Url,
            City = u.City,
            Country = u.Country,
            Id = u.Id,
        }).ToListAsync();

        //var pagedList = await PagedList<LikeDto>.CreateAsync(likedUsers,
        //        likesParams.PageNumber, likesParams.PageSize);

        return likedUsers;
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<AppUser> GetUserWithLikes(int userId)
    {
        // devuelve un user con sus likes
        var userWithLikes = await _context.Users
                            .Include(u => u.LikedUsers)
                            .FirstOrDefaultAsync(u => u.Id == userId);

        return userWithLikes;
    }

}
