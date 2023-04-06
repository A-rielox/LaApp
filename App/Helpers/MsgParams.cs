namespace App.Helpers;

public class MsgParams : PaginationParams
{
    public string Username { get; set; }
    public string Container { get; set; } = "Unread";
}
