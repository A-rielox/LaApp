using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using App.DTOs;
using App.Interfaces;
using App.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Identity;

namespace App.Controllers;

public class AccountController : BaseController
{
    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;

    public AccountController(UserManager<AppUser> userManager,
                             ITokenService tokenService,
                             IMapper mapper)
    {
        _userManager = userManager;
        _tokenService = tokenService;
        _mapper = mapper;
    }


    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // POST: api/Account/register
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Username)) return BadRequest("Este nombre ya está tomado.");

        var user = _mapper.Map<AppUser>(registerDto);

        user.UserName = registerDto.Username.ToLower();

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded) return BadRequest(result.Errors);

        var roleResult = await _userManager.AddToRoleAsync(user, "Member");

        if (!roleResult.Succeeded) return BadRequest(roleResult.Errors);

        return new UserDto
        {
            UserName = user.UserName,
            KnownAs = user.KnownAs,
            Token = await _tokenService.CreateToken(user)
        };
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // POST: api/Account/login
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.Users.Include(u => u.Photos)
                                  .SingleOrDefaultAsync(u =>
                                      u.UserName == loginDto.Username);

        if (user == null) return Unauthorized("Nombre invalido.");

        var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

        if (!result) return Unauthorized();

        return new UserDto
        {
            UserName = user.UserName,
            KnownAs = user.KnownAs,
            PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain)?.Url,
            Token = await _tokenService.CreateToken(user)
        };
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    private async Task<bool> UserExists(string username)
    {
        return await _userManager.Users.AnyAsync(u => u.UserName == username.ToLower());
    }

}
