using Microsoft.AspNetCore.Mvc;
using App.Entities;
using Microsoft.AspNetCore.Authorization;
using App.Interfaces;

namespace App.Controllers;

[Authorize]
public class UsersController : BaseApiController
{
    private readonly IUserRepository _userRepository;

    public UsersController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }



    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // GET: api/Users
    //[Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        //var users = await _context.Users.ToListAsync();
        var users = await _userRepository.GetUsersAsync();

        return Ok(users);
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // GET: api/Users/username
    [HttpGet("{username}")]
    public async Task<ActionResult<AppUser>> GetUser(string username)
    {
        var user = await _userRepository.GetUserByUsernameAsync(username);

        return Ok(user);
    }
}
