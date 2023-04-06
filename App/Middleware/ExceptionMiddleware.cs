using App.Errors;
using System.Net;
using System.Text.Json;

namespace App.Middleware;

// p'q se ocupe, en program.cs "app.UseMiddleware<ExceptionMiddleware>();"

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;
    private readonly IHostEnvironment _env;

    // los middlewares necesitan el delegate para pasar al next
    // IHostEnvironment env --> p' ver en q ambiente estoy
    public ExceptionMiddleware(
                                RequestDelegate next,
                                ILogger<ExceptionMiddleware> logger,
                                IHostEnvironment env
                                )
    {
        _next = next;
        _logger = logger;
        _env = env;
    }

    // con "HttpContext context" es q tengo acceso al req
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (System.Exception ex)
        {
            _logger.LogError(ex, ex.Message); // p' ver el error en la terminal
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            // ApiException es la clase q yo cree
            var response = _env.IsDevelopment()
                ? new Errors.Exception(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                : new Errors.Exception(context.Response.StatusCode, "Internal Server Error");

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

            var json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }
    }
}
