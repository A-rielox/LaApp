using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using App.DTOs;
using App.Entities;
using App.Helpers;
using App.Interfaces;

namespace App.Data;

public class PostRepository : IPostRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public PostRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }


    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public void AddPost(Post post)
    {
        _context.Posts.Add(post);
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public void DeletePost(Post post)
    {
        _context.Posts.Remove(post);
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<Post> GetPostAsync(int id)
    {
        var post = await _context.Posts
                    .Include(p => p.CreatedBy)
                    .FirstOrDefaultAsync(p => p.Id == id);

        return post;
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<PagedList<PostDto>> GetPostsAsync(PostParams postParams)
    {
        var query = _context.Posts.Include(p => p.CreatedBy).OrderByDescending(p => p.Created).AsQueryable();

        if (!String.IsNullOrEmpty(postParams.Ownername)) // p' buscar las propias recetas 
        {
            query = query.Where(r => r.CreatedBy.UserName.ToLower() == postParams.Ownername.ToLower());
        }

        if (!String.IsNullOrEmpty(postParams.Membername)) // p' buscar las de un mienbro xsu knownAs
        {
            query = query.Where(r => r.CreatedBy.KnownAs.ToLower().Contains(postParams.Membername.ToLower()));
        }

        if (!String.IsNullOrEmpty(postParams.Title))
        {
            query = query.Where(r => r.Title.ToLower().Contains(postParams.Title.ToLower()));
        }

        var pagedPosts = await PagedList<PostDto>.CreateAsync(
                            query.AsNoTracking().ProjectTo<PostDto>(_mapper.ConfigurationProvider),
                            postParams.PageNumber, postParams.PageSize);

        return pagedPosts;
    }

    //public async Task<IEnumerable<PostDto>> GetPostsAsync()
    //{
    //    var posts = await _context.Posts
    //                        .OrderByDescending(p => p.CreatedBy)
    //                        .ProjectTo<PostDto>(_mapper.ConfigurationProvider)
    //                        .ToListAsync();

    //    return posts;
    //}

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public void UpdatePost(Post post)
    {
        _context.Entry(post).State = EntityState.Modified;
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    //public async Task<bool> SaveAllAsync()
    //{
    //    return await _context.SaveChangesAsync() > 0;
    //}
}
