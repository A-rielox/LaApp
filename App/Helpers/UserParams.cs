namespace App.Helpers;

/*
public class UserParams : PaginationParams
{
    // este lo pongo en la action del controller desde el token q recibo
    public string CurrentUsername { get; set; }
    
    public string OrderBy { get; set; } = "lastActive";
}
*/


public class UserParams
{
    private const int MaxPageSize = 50;
    private int _pageSize = 10;

    public int PageNumber { get; set; } = 1;
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }

    public string CurrentUsername { get; set; }
    public string OrderBy { get; set; } = "lastActive";
}
