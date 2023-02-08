namespace App.Helpers;


public class UserParams : PaginationParams
{
    // este lo pongo en la action del controller desde el token q recibo
    public string CurrentUsername { get; set; }
    
    public string OrderBy { get; set; } = "lastActive";
}
