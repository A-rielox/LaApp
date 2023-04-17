using App.DTOs;
using App.Entities;
using App.Helpers;

namespace App.Interfaces;

public interface IPostRepository
{
    void AddPost(Post post);
    void DeletePost(Post post);
    Task<Post> GetPostAsync(int id);



    //Task<IEnumerable<PostDto>> GetPostsAsync();
    Task<PagedList<PostDto>> GetPostsAsync(PostParams postParams);



    void UpdatePost(Post post);


    //Task<bool> SaveAllAsync();
}
