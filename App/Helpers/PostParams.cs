namespace App.Helpers;

public class PostParams : PaginationParams
{
    public string Ownername { get; set; } // p'q busque "mis" recetas


    // p' buscar recetas de member con KnownAs q es el q se ve en el front
    public string Membername { get; set; }

    public string Title { get; set; } // q el titulo contenga
}

/*
public class PaginationParams
{
    private const int MaxPageSize = 50;
    private int _pageSize = 10;

    public int PageNumber { get; set; } = 1;
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }
} 
*/