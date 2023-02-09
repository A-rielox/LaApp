using App.Entities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Identity;

namespace App.Data;

public class Seed
{
    public static async Task SeedUsers(UserManager<AppUser> userManager,
                                       RoleManager<AppRole> roleManager)
    {
        if (await userManager.Users.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

        //var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var users = JsonConvert.DeserializeObject<List<AppUser>>(userData);// The solution was to change from System.Text.Json to Newtonsoft Json with this line

        var roles = new List<AppRole>
        {
            new AppRole { Name = "Member"},
            new AppRole { Name = "Admin"},
            new AppRole { Name = "Moderator"}
        };

        foreach (var role in roles)
        {
            await roleManager.CreateAsync(role);
        }

        foreach (var user in users)
        {

            user.UserName = user.UserName.ToLower();
            await userManager.CreateAsync(user, "P@ssword1");
            await userManager.AddToRoleAsync(user, "Member");
        }

        var admin = new AppUser
        {
            UserName = "admin",
        };

        await userManager.CreateAsync(admin, "P@ssword1");
        await userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });
    }

    public static async Task SeedRecipe(DataContext context)
    {
        if (await context.Recipes.AnyAsync()) return;

        var recipeData = await File.ReadAllTextAsync("Data/RecipeSeedData.json");

        //var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var recipes = JsonConvert.DeserializeObject<List<Recipe>>(recipeData);// The solution was to change from System.Text.Json to Newtonsoft Json with this line

       
        foreach (var recipe in recipes)
        {
            context.Recipes.Add(recipe);
        }

        await context.SaveChangesAsync();
    }
    public static async Task SeedPost(DataContext context)
    {
        if (await context.Posts.AnyAsync()) return;

        var postData = await File.ReadAllTextAsync("Data/PostSeedData.json");

        //var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        var posts = JsonConvert.DeserializeObject<List<Post>>(postData);// The solution was to change from System.Text.Json to Newtonsoft Json with this line


        foreach (var post in posts)
        {
            context.Posts.Add(post);
        }

        await context.SaveChangesAsync();
    }
}



/*                              PREVIO IDENTITY

public class Seed
{
    public static async Task SeedUsers(DataContext context)
    {
        if (await context.Users.AnyAsync()) return;

        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        //var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
        var users = JsonConvert.DeserializeObject<List<AppUser>>(userData);// The solution was to change from System.Text.Json to Newtonsoft Json with this line

        foreach (var user in users)
        {
            user.UserName = user.UserName.ToLower();

            context.Users.Add(user);
        }

        await context.SaveChangesAsync();
    }
}
*/
