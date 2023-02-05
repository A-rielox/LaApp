using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using App.Data;

namespace App.Controllers;

public class UsersController : BaseApiController
{
    private readonly DataContext _context;

    public UsersController(DataContext context)
    {
        _context = context;
    }



    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // GET: api/Users
    //[Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        var users = await _context.Users.ToListAsync();

        return users;
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // GET: api/Users/id
    [HttpGet("{id}")]
    //[Authorize]
    public async Task<ActionResult<AppUser>> GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);

        return user;
    }
}
