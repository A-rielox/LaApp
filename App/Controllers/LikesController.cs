using App.DTOs;
using App.Entities;
using App.Extensions;
using App.Helpers;
using App.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers;

public class LikesController : BaseApiController
{
    private readonly IUserRepository _userRepository;
    private readonly ILikesRepository _likesRepository;

    public LikesController(IUserRepository userRepository, ILikesRepository likesRepository)
	{
        _userRepository = userRepository;
        _likesRepository = likesRepository;
    }


    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // para dar like
    // POST: api/likes/{username} --> del route parameter
    // el username es de a quien se le da el like
    [HttpPost("{username}")]
    public async Task<ActionResult> AddLike(string username)
    {
        // el usuario dando el like
        var sourceUserId = User.GetUserId();

        // user al q le doy el like
        var likedUser = await _userRepository.GetUserByUsernameAsync(username);

        // el user logeado con su lista de likes
        var sourceUser = await _likesRepository.GetUserWithLikes(sourceUserId);

        // no se encontro el user al q le quieren dar el like
        if (likedUser == null) return NotFound();

        // para no darse likes a uno mismo
        if (sourceUser.UserName == username) return BadRequest("No te puedes dar likes a ti.");

        // para ver si ya se le habia dado like
        var userLike = await _likesRepository.GetUserLike(sourceUserId, likedUser.Id);

        if (userLike != null) return BadRequest("Ya le habias dado like a este usuario.");

        // EN LUGAR DE MANDAR EL BADREQUEST SE PODRIA QUITAR EL LIKE 

        userLike = new UserLike
        {
            SourceUserId = sourceUserId,
            TargetUserId = likedUser.Id,
        };

        sourceUser.LikedUsers.Add(userLike);
        // checar si tambien se rellena el LikedByUsers de el q se le da el like
        // xq este solo llena el LikedUsers

        if (await _userRepository.SaveAllAsync()) return Ok();

        return BadRequest("No se pudo dar el like.");
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // GET: api/likes?predicate=liked o likedBy
    // p' agarrar los likes de un user
    [HttpGet]
    //public async Task<ActionResult<PagedList<LikeDto>>> GetUserLikes([FromQuery] LikesParams likesParams)
    //{
    //    // id del q da el like
    //    likesParams.UserId = User.GetUserId();

    //    var pagedUsers = await _likesRepository.GetUserLikes(likesParams);

    //    Response.AddPaginationHeader(new PaginationHeader(pagedUsers.CurrentPage,
    //            pagedUsers.PageSize, pagedUsers.TotalCount, pagedUsers.TotalPages));

    //    return Ok(pagedUsers);
    //}

    public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes(string predicate)
    {
        // id del q da el like
        var sourceUserId = User.GetUserId();

        var users = await _likesRepository.GetUserLikes(predicate, sourceUserId);

        return Ok(users);
    }

    // api/likes?predicate=liked   --> los q me han gustado
    // api/likes?predicate=likedBy --> a los q les e gustado
}
