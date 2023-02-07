using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using App.Data;
using App.DTOs;
using App.Interfaces;
using App.Entities;

namespace App.Controllers;

public class AccountController : BaseApiController
{
    private readonly DataContext _context;
    private readonly ITokenService _tokenService;

    public AccountController(DataContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }


    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // POST: api/Account/register
    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Username)) return BadRequest("Nombre de usuario no disponible.");

        using var hmac = new HMACSHA512();

        var user = new AppUser
        {
            UserName = registerDto.Username.ToLower(),
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
            PasswordSalt = hmac.Key
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return new UserDto
        {
            UserName = user.UserName,
            Token = _tokenService.CreateToken(user)
        };

        //    if (await UserExists(registerDto.Username)) return BadRequest("Username is taken.");

        //    var user = _mapper.Map<AppUser>(registerDto);

        //    user.UserName = registerDto.Username.ToLower();

        //    var result = await _userManager.CreateAsync(user, registerDto.Password);

        //    if (!result.Succeeded) return BadRequest(result.Errors);

        //    var roleResult = await _userManager.AddToRoleAsync(user, "Member");

        //    if(!roleResult.Succeeded) return BadRequest(roleResult.Errors);

        //    return new UserDto
        //    {
        //        UserName = user.UserName,
        //        Token = await _tokenService.CreateToken(user),
        //        KnownAs = user.KnownAs
        //        // Gender = user.Gender
        //    };
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // POST: api/Account/login
    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _context.Users
            .Include(u => u.Photos)
            .FirstOrDefaultAsync(u => u.UserName == loginDto.Username);

        if (user == null) return Unauthorized("El usuario no existe.");

        using var hmac = new HMACSHA512(user.PasswordSalt);

        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        for(int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Pass incorrecto.");
        }

        return new UserDto
        {
            UserName = user.UserName,
            KnownAs = user.KnownAs,
            PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain)?.Url,
            Token = _tokenService.CreateToken(user)
        };

        //    var user = await _userManager.Users.Include(u => u.Photos)
        //                              .SingleOrDefaultAsync(u =>
        //                                  u.UserName == loginDto.Username);

        //    if (user == null) return Unauthorized("Invalid username.");

        //    var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);

        //    if (!result) return Unauthorized();

        //    return new UserDto
        //    {
        //        UserName = user.UserName,
        //        KnownAs = user.KnownAs,
        //        PhotoUrl = user.Photos.FirstOrDefault(p => p.IsMain)?.Url,
        //        Token = await _tokenService.CreateToken(user)
        //        // Gender = user.Gender
        //    };
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    private async Task<bool> UserExists(string username)
    {
        return await _context.Users.AnyAsync(u => u.UserName == username.ToLower());
    }

}
