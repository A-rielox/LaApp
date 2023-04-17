using App.DTOs;
using App.Entities;
using App.Helpers;

namespace App.Interfaces;

public interface IRecipeRepository
{
    void AddRecipe(Recipe recipe);
    void DeleteRecipe(Recipe recipe);
    Task<Recipe> GetRecipeAsync(int id);


   
    //Task<IEnumerable<RecipeDto>> GetRecipesAsync();
    Task<PagedList<RecipeDto>> GetRecipesAsync(RecipeParams recipeParams);



    void UpdateRecipe(Recipe recipe);


    //Task<bool> SaveAllAsync();
}
