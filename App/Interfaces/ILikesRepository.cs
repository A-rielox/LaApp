using App.DTOs;
using App.Entities;

namespace App.Interfaces;

public interface ILikesRepository
{
    Task<UserLike> GetUserLike(int sourceUserId, int targetUserId);
    Task<AppUser> GetUserWithLikes(int userId);

    //Task<PagedList<LikeDto>> GetUserLikes(LikesParams likesParams);
    Task<IEnumerable<LikeDto>> GetUserLikes(string predicate, int userId);
}
