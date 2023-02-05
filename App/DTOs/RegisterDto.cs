using System.ComponentModel.DataAnnotations;

namespace App.DTOs;

public class RegisterDto
{
    [Required] public string Username { get; set; }
    //[Required] public string KnownAs { get; set; }
    //[Required] public string City { get; set; }
    //[Required] public string Country { get; set; }


    [StringLength(12, MinimumLength = 4)]
    [Required] public string Password { get; set; }
}
