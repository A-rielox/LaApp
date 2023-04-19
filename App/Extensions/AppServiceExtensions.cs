using App.Data;
using App.Helpers;
using App.Interfaces;
using App.Services;
using Microsoft.EntityFrameworkCore;

namespace App.Extensions;

public static class AppServiceExtensions
{
    public static IServiceCollection AddAplicationServices(
                        this IServiceCollection services,
                        IConfiguration config
                    )
    {
        //services.AddDbContext<DataContext>(opt =>
        //{
        //    opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
        //});

        //services.AddDbContext<DataContext>(options =>
        //{
        //    options.UseNpgsql(config.GetConnectionString("DefaultConnection"));
        //});


        services.AddCors();


        //services.AddCors(options =>
        //{
        //    options.AddPolicy("AllowAll", b => b.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));
        //});


        services.AddScoped<ITokenService, TokenService>();

        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

        services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
        services.AddScoped<IPictureService, PictureService>();

        services.AddScoped<LogUserActivity>();

        services.AddScoped<IRecipeRepository, RecipeRepository>();
        services.AddScoped<IPostRepository, PostRepository>();

        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }
}
