using Microsoft.AspNetCore.Mvc;
using App.Entities;
using Microsoft.AspNetCore.Authorization;
using App.Interfaces;
using AutoMapper;
using App.DTOs;
using System.Security.Claims;
using App.Extensions;
using App.Helpers;

namespace App.Controllers;

[Authorize]
public class UsersController : BaseApiController
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IPhotoService _photoService;

    public UsersController(IUserRepository userRepository,
                           IMapper mapper,
                           IPhotoService photoService)
    {
        _userRepository = userRepository;
        _mapper = mapper;
        _photoService = photoService;
    }



    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // GET: api/Users
    //[Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<PagedList<MemberDto>>> GetUsers([FromQuery]UserParams userParams)
    {
        var currentUser = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
        userParams.CurrentUsername = currentUser.UserName;

        var pagedMembers = await _userRepository.GetMembersAsync(userParams);

        Response.AddPaginationHeader(new PaginationHeader(pagedMembers.CurrentPage,
                          pagedMembers.PageSize, pagedMembers.TotalCount, pagedMembers.TotalPages));

        return Ok(pagedMembers);
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // GET: api/Users/username
    [HttpGet("{username}")]
    public async Task<ActionResult<MemberDto>> GetUser(string username)
    {
        var member = await _userRepository.GetMemberAsync(username);

        return Ok(member);
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // PUT: api/Users/
    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
    {
        //var username = User.FindFirst(ClaimTypes.Name)?.Value;
        var username = User.GetUsername();

        var user = await _userRepository.GetUserByUsernameAsync(username);

        if (user == null) return NotFound();

        // hace el update en el user con lo q tiene el memberUpdateDto
        _mapper.Map(memberUpdateDto, user);

        if (await _userRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Problemas editando el usuario.");
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // POST: api/Users/add-photo
    [HttpPost("add-photo")]
    public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
    {
        var username = User.GetUsername();
        // p'q funcione el resto debo hacer eagerLoading de las fotos con el GetUserByUsernameAsync
        // p'q luego checo el " if(user.Photos.Count == 0) "
        var user = await _userRepository.GetUserByUsernameAsync(username);
        if (user == null) return NotFound();

        var result = await _photoService.AddPhotoAsync(file);

        if (result.Error != null) return BadRequest(result.Error.Message);

        var photo = new Photo
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };

        if (user.Photos.Count == 0)
        {
            photo.IsMain = true;
        }

        user.Photos.Add(photo);

        if (await _userRepository.SaveAllAsync())
        {
            //                        <-------
            //return _mapper.Map<PhotoDto>(photo);
            // el " new {} " es xq la ruta GetUser ocupa ese parametro para ir al user
            // el tercer parametro es el object que se creó
            return CreatedAtAction(nameof(GetUser),
                    new { username = user.UserName }, _mapper.Map<PhotoDto>(photo));
        }

        return BadRequest("Problemas al añadir la foto.");
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // PUT: api/Users/set-main-photo/{photoId}
    [HttpPut("set-main-photo/{photoId}")]
    public async Task<ActionResult> SetMainPhoto(int photoId)
    {
        var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

        if (user == null) return NotFound();

        var photo = user.Photos.FirstOrDefault(p => p.Id == photoId);

        if (photo == null) return NotFound("La foto que buscas no existe.");

        if (photo.IsMain) return BadRequest("Esta ya es tu foto principal.");

        var currentMain = user.Photos.FirstOrDefault(p => p.IsMain);

        if (currentMain != null) currentMain.IsMain = false;

        photo.IsMain = true;

        if (await _userRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Problem setting the main photo");
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // DELETE: api/Users/delete-photo/{photoId}
    [HttpDelete("delete-photo/{photoId}")]
    public async Task<ActionResult> DeletePhoto(int photoId)
    {
        // saco el usernane del token
        var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

        var photo = user.Photos.FirstOrDefault(p => p.Id == photoId);

        if (photo == null) return NotFound();

        // p' NO tener q adivinar q hacer como main foto
        if (photo.IsMain) return BadRequest("No puedes borrar tu foto principal.");

        // si esta en cloudinary => tiene una publicId
        if (photo.PublicId != null)
        {
            var result = await _photoService.DeletePhotoAsync(photo.PublicId);
            if (result.Error != null) return BadRequest(result.Error.Message);
        }

        user.Photos.Remove(photo);

        if (await _userRepository.SaveAllAsync()) return Ok();

        return BadRequest("Problemas borrando tu foto.");
    }
}
