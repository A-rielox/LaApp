using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using App.Entities;

namespace App.Controllers;

public class AdminController : BaseApiController
{
    private readonly UserManager<AppUser> _userManager;

    public AdminController(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }



    //////////////////////////////////////
    // GET: api/admin/users-with-roles
    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet("users-with-roles")]
    public async Task<ActionResult> GetUsersWithroles()
    {
        var users = await _userManager.Users
            .OrderBy(u => u.UserName)
            .Select( u => new
            {
                u.Id,
                Username = u.UserName,
                Roles = u.UserRoles.Select(r => r.Role.Name).ToList(),
            })
            .ToListAsync();

        return Ok(users);
    }


    //////////////////////////////////////
    //  POST: api/admin/edit-roles/{username}
    // api/admin/edit-roles/lisa?roles=Moderator,Member
    [Authorize(Policy = "RequireAdminRole")]
    [HttpPost("edit-roles/{username}")]
    public async Task<ActionResult> EditRoles(string username,
                                              [FromQuery] string roles)
    {
        if (string.IsNullOrEmpty(roles)) 
            return BadRequest("Debes seleccionar al menos un rol.");

        var selectedRoles = roles.Split(",").ToArray();

        var user = await _userManager.FindByNameAsync(username);

        // SIEMPRE q agarre cosas de un parameter TENGO q checar q no sea null
        if (user == null) return NotFound();

        // roles actuales
        var userRoles = await _userManager.GetRolesAsync(user);

        // añado los roles q se mandan en el query ( except p' no volver a poner los q ya tiene )
        var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

        if (!result.Succeeded) return BadRequest("Problemas al añadir rol/roles.");

        // para quitar roles
        // si ya tenia algun role y no lo pasé como role en el query se va a remover
        result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

        if (!result.Succeeded) return BadRequest("Probelams quitando rol/roles.");

        // retorno la lista actualizado de los roles q se tiene
        return Ok(await _userManager.GetRolesAsync(user));
    }

    //////////////////////////////////////
    // GET : api/admin/photos-to-moderate
    [Authorize(Policy = "ModeratePhotoRole")]
    [HttpGet("photos-to-moderate")]
    public ActionResult GetPhotosForModeration()
    {
        return Ok("Only for admins or moderators");
    }

    //////////////////////////////////////
    //
}
