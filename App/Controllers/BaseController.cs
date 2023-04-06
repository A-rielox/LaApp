using App.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace App.Controllers;

[ServiceFilter(typeof(LogUserActivity))]
[Route("api/[controller]")]
[ApiController]
public class BaseController : ControllerBase
{    
}
