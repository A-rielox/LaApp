using App.Extensions;
using App.Middleware;

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

app.Run();
