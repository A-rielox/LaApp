namespace App.Interfaces;

public interface IUnitOfWork
{
    IUserRepository UserRepository { get; }
    IMsgRepository MessageRepository { get; }
    ILikesRepository LikesRepository { get; }
    IPostRepository PostRepository { get; }
    IRecipeRepository RecipeRepository { get; }

    Task<bool> Complete();

    bool HasChanges();
}
