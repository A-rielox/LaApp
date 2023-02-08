namespace Socioil_API.Helpers;

public class PaginationParams
{
    private const int MaxPageSize = 50;
    private int _pageSize = 10;

    private const int MinPageNumber = 1;
    private int _pageNumber = 1;

    public int PageNumber 
    {
        get => _pageNumber;
        set => _pageNumber = (value <= 0) ? MinPageNumber : value;
    }
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }
}



// hacer q si manda PageNumber menor o igual a cero , se ponga 1

//public class PaginationParams
//{
//    private const int MaxPageSize = 50;
//    private int _pageSize = 10;

//    public int PageNumber { get; set; } = 1;
//    public int PageSize
//    {
//        get => _pageSize;
//        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
//    }
//}