using Microsoft.AspNetCore.Mvc;
using App.Entities;
using Microsoft.AspNetCore.Authorization;
using App.Interfaces;
using AutoMapper;
using App.DTOs;
using System.Security.Claims;

namespace App.Controllers;

[Authorize]
public class UsersController : BaseApiController
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UsersController(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }



    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // GET: api/Users
    //[Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
        var members = await _userRepository.GetMembersAsync();

        return Ok(members);
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
        var username = User.FindFirst(ClaimTypes.Name)?.Value;
        //var username = User.GetUsername();

        var user = await _userRepository.GetUserByUsernameAsync(username);

        if (user == null) return NotFound();

        // hace el update en el user con lo q tiene el memberUpdateDto
        _mapper.Map(memberUpdateDto, user);

        if (await _userRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Problemas editando el usuario.");
    }

}
