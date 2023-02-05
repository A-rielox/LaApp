using Microsoft.AspNetCore.Mvc;
//using App.Helpers;

namespace App.Controllers;

//[ServiceFilter(typeof(LogUserActivity))]
[Route("api/[controller]")]
[ApiController]
public class BaseApiController : ControllerBase
{    
}
