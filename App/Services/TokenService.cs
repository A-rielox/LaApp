using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using App.Interfaces;
using App.Entities;

namespace App.Services;

public class TokenService : ITokenService
{
    private readonly SymmetricSecurityKey _key;
    private readonly UserManager<AppUser> _userManager;

    public TokenService(IConfiguration config, UserManager<AppUser> userManager)
    {
        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
        _userManager = userManager;
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    // public string CreateToken(AppUser user)
    public async Task<string> CreateToken(AppUser user)
    {
        var claims = new List<Claim>
            {
                // este lo agarro con "ClaimTypes.NameIdentifier" (en var username = User.FindFirst(ClaimTypes.Name)?.Value;)
                new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
                // este lo agarro con "ClaimTypes.Name"
                new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
            };

        // Añado el claims con los roles.
        // la lista de roles del usuario q se pasa
        var roles = await _userManager.GetRolesAsync(user);
        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}
