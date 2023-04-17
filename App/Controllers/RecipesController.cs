using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using App.DTOs;
using App.Entities;
using App.Extensions;
using App.Helpers;
using App.Interfaces;

namespace App.Controllers;

[Authorize]
public class RecipesController : BaseController
{
    private readonly IUnitOfWork _uow;
    private readonly IMapper _mapper;

    public RecipesController(IUnitOfWork uow, IMapper mapper)
    {
        _uow = uow;
        _mapper = mapper;
    }


    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // POST:  api/recipes
    [HttpPost]
    public async Task<ActionResult<RecipeDto>> CreateRecipe(CreateRecipeDto createRecipeDto)
    {
        var username = User.GetUsername();

        var createdBy = await _uow.UserRepository.GetUserByUsernameAsync(username);

        if (createdBy == null) return NotFound("Usuario no encontrado.");

        var recipe = new Recipe
        {
            Title = createRecipeDto.Title,
            Category = createRecipeDto.Category,
            Content = createRecipeDto.Content,
            OilsList = createRecipeDto.OilsList,
            CreatedBy = createdBy,
        };

        _uow.RecipeRepository.AddRecipe(recipe);

        if (await _uow.Complete())
        {
            var recipeDto = _mapper.Map<RecipeDto>(recipe);

            return Ok(recipeDto);
        }

        return BadRequest("No se pudo añadir la receta.");
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // GET:  api/recipes
    [HttpGet]
    public async Task<ActionResult<PagedList<RecipeDto>>> GetRecipes(
                                        [FromQuery] RecipeParams recipeParams)
    {
        var pagedRecipes = await _uow.RecipeRepository.GetRecipesAsync(recipeParams);

        Response.AddPaginationHeader(new PaginationHeader(pagedRecipes.CurrentPage,
                                pagedRecipes.PageSize, pagedRecipes.TotalCount, pagedRecipes.TotalPages));

        return Ok(pagedRecipes);
    }

    //public async Task<ActionResult<IEnumerable<RecipeDto>>> GetRecipes()
    //{
    //    var recipes = await _recipeRepository.GetRecipesAsync();

    //    return Ok(recipes);
    //}

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // DELETE:  api/recipes/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteRecipe(int id)
    {
        var username = User.GetUsername();

        var recipe = await _uow.RecipeRepository.GetRecipeAsync(id);

        if (recipe == null)
        {
            return NotFound("No existe la receta que intentas borrar.");
        }

        if (username != recipe.CreatedBy.UserName)
        {
            return Unauthorized("Solo puedes borrar tus recetas.");
        }

        _uow.RecipeRepository.DeleteRecipe(recipe);

        if (await _uow.Complete()) return Ok();

        return BadRequest("No se pudo borrar la receta.");
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // PUT:  api/recipes
    [HttpPut]
    public async Task<ActionResult> UpdateRecipe([FromBody]RecipeUpdateDto recipeUpdateDto)
    {
        var username = User.GetUsername();

        // GetRecipeAsync incluye el AppUser que en este caso no necesito
        var recipe = await _uow.RecipeRepository.GetRecipeAsync(recipeUpdateDto.Id);

        if (recipe == null)
        {
            return NotFound("No existe la receta que intentas editar.");
        }

        if (username != recipe.CreatedBy.UserName)
        {
            return Unauthorized("Solo puedes editar tus recetas.");
        }

        // hace el update en recipe con lo q tiene en recipeUpdateDto
        _mapper.Map(recipeUpdateDto, recipe);

        // NO necesito el UpdateRecipe del repository xq ya la trackea cuando " var reicpe = ... "
        if (await _uow.Complete()) return NoContent();

        return BadRequest("No se pudo editar la receta.");
    }
}
