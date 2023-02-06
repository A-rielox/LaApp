using App.Data;
using App.Entities;
using App.Extensions;
using App.Middleware;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



// mis extensiones
builder.Services.AddAplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);













var app = builder.Build();

// Configure the HTTP request pipeline.

// DEBE IR EN LA PARTE DE MAS ARRIBA DEL pipeline
// este es para ocupar mi middleware de excepciones y no tener que poner try-catch por todos lados
app.UseMiddleware<ExceptionMiddleware>();









if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();




app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());



app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();






// para el seeding de users, va despues de MapControllers y antes de .Run
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
// try-catch p' errores durante el seeding
try
{
    var context = services.GetRequiredService<DataContext>();
    //var userManager = services.GetRequiredService<UserManager<AppUser>>();
    //var roleManager = services.GetRequiredService<RoleManager<AppRole>>();

    await context.Database.MigrateAsync();

    //await Seed.SeedUsers(userManager, roleManager);
    await Seed.SeedUsers(context);
}
catch (Exception ex)
{
    var logger = services.GetService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}








app.Run();
