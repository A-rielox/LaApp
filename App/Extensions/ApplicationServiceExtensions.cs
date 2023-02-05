using App.Data;
using App.Services;
using Microsoft.EntityFrameworkCore;
using App.interfaces;

namespace App.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddAplicationServices(
                        this IServiceCollection services,
                        IConfiguration config
                    )
    {
        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
        });


        services.AddCors();


        //services.AddCors(options =>
        //{
        //    options.AddPolicy("AllowAll", b => b.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200"));
        //});


        services.AddScoped<ITokenService, TokenService>();
        //services.AddScoped<IUserRepository, UserRepository>();

        //services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

        //services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));
        //services.AddScoped<IPhotoService, PhotoService>();

        //services.AddScoped<LogUserActivity>();

        //services.AddScoped<ILikesRepository, LikesRepository>();
        //services.AddScoped<IMessageRepository, MessageRepository>();

        //services.AddScoped<IUnitOfWork, UnitOfWork>();


        //services.AddScoped<IRecipeRepository, RecipeRepository>();
        //services.AddScoped<IPostRepository, PostRepository>();


        return services;
    }
}
