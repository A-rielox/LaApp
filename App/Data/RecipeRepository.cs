using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using App.DTOs;
using App.Entities;
using App.Helpers;
using App.Interfaces;

namespace App.Data;

[Authorize]
public class RecipeRepository : IRecipeRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public RecipeRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }


    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public void AddRecipe(Recipe recipe)
    {
        _context.Recipes.Add(recipe);
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public void DeleteRecipe(Recipe recipe)
    {
        _context.Recipes.Remove(recipe);
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<Recipe> GetRecipeAsync(int id)
    {
        var recipe = await _context.Recipes
                    .Include(r => r.CreatedBy)
                    .FirstOrDefaultAsync(r => r.Id == id);

        return recipe;
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<PagedList<RecipeDto>> GetRecipesAsync(RecipeParams recipeParams)
    {
        var query = _context.Recipes.Include(r => r.CreatedBy).OrderByDescending(r => r.Created).AsQueryable();

        if (!String.IsNullOrEmpty(recipeParams.Ownername)) // p' buscar las propias recetas 
        {
            query = query.Where(r => r.CreatedBy.UserName.ToLower() == recipeParams.Ownername.ToLower());
        }

        if (!String.IsNullOrEmpty(recipeParams.Membername)) // p' buscar las de un mienbro xsu knownAs
        {
            query = query.Where(r => r.CreatedBy.KnownAs.ToLower().Contains(recipeParams.Membername.ToLower()));
        }

        if (!String.IsNullOrEmpty(recipeParams.Title))
        {
            query = query.Where(r => r.Title.ToLower().Contains(recipeParams.Title.ToLower()));
        }

        var pagedList = await PagedList<RecipeDto>.CreateAsync(
                                query.AsNoTracking().ProjectTo<RecipeDto>(_mapper.ConfigurationProvider),
                                recipeParams.PageNumber, recipeParams.PageSize);

        return pagedList;
    }

    //public async Task<IEnumerable<RecipeDto>> GetRecipesAsync()
    //{
    //    var recipes = await _context.Recipes
    //                        .OrderByDescending(r => r.Created)
    //                        .ProjectTo<RecipeDto>(_mapper.ConfigurationProvider)
    //                        .ToListAsync();

    //    return recipes;
    //}

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //          ------------------------------------------- NO LO ESTOY OCUPANDO
    public void UpdateRecipe(Recipe recipe)
    {
        _context.Entry(recipe).State = EntityState.Modified;
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

}
