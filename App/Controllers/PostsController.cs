﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using App.DTOs;
using App.Entities;
using App.Extensions;
using App.Helpers;
using App.Interfaces;

namespace App.Controllers;

[Authorize]
public class PostsController : BaseController
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public PostsController(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }


    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // POST:  api/posts
    [HttpPost]
    public async Task<ActionResult<PostDto>> CreatePost(CreatePostDto createPostDto)
    {
        var username = User.GetUsername();

        var createdBy = await _uow.UserRepository.GetUserByUsernameAsync(username);

        if (createdBy == null) return NotFound("Usuario no encontrado.");

        var post = new Post
        {
            Title = createPostDto.Title,
            Category = createPostDto.Category,
            Content = createPostDto.Content,
            CreatedBy = createdBy,
        };

        _uow.PostRepository.AddPost(post);

        if (await _uow.Complete())
        {
            var postDto = _mapper.Map<PostDto>(post);

            return Ok(postDto);
        }

        return BadRequest("No se pudo crear el post.");
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // GET:  api/posts
    [HttpGet]
    public async Task<ActionResult<PagedList<PostDto>>> GetPosts(
                                        [FromQuery] PostParams postParams)
    {
        var pagedPosts = await _uow.PostRepository.GetPostsAsync(postParams);

        Response.AddPaginationHeader(new PaginationHeader(pagedPosts.CurrentPage,
            pagedPosts.PageSize,pagedPosts.TotalCount,pagedPosts.TotalPages));

        return Ok(pagedPosts);
    }

    //public async Task<ActionResult<IEnumerable<PostDto>>> GetPosts()
    //{
    //    var posts = await _postRepository.GetPostsAsync();

    //    return Ok(posts);
    //}

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // DELETE:  api/posts/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletePost(int id)
    {
        var username = User.GetUsername();

        var post = await _uow.PostRepository.GetPostAsync(id);

        if (post == null)
        {
            return NotFound("No existe el post que intentas borrar.");
        }

        if (username != post.CreatedBy.UserName)
        {
            return Unauthorized("Solo puedes borrar tus posts.");
        }

        _uow.PostRepository.DeletePost(post);

        if (await _uow.Complete()) return Ok();

        return BadRequest("No se pudo borrar el post.");
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // PUT:  api/posts
    [HttpPut]
    public async Task<ActionResult> UpdatePost([FromBody] PostUpdateDto postUpdateDto)
    {
        var username = User.GetUsername();
        var post = await _uow.PostRepository.GetPostAsync(postUpdateDto.Id);

        if (post == null)
        {
            return NotFound("No existe el post que intentas editar.");
        }

        if (username != post.CreatedBy.UserName)
        {
            return Unauthorized("Solo puedes editar tus posts.");
        }

        // hace el update en post con lo q tiene en postUpdateDto
        _mapper.Map(postUpdateDto, post);

        // NO necesito el UpdateRecipe del repository xq ya la trackea cuando " var reicpe = ... "

        //if (await _postRepository.SaveAllAsync()) return NoContent(); X LO DEL EDITOR

        await _uow.Complete();
        return NoContent();

        //return BadRequest("No se pudo editar el post.");
    }


}
