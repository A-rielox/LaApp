using App.DTOs;
using App.Entities;
using App.Helpers;

namespace App.Interfaces;

public interface IMsgRepository
{
    void AddMessage(Msg message);
    void DeleteMessage(Msg message);
    Task<Msg> GetMessage(int id);

    Task<PagedList<MsgDto>> GetMessagesForUser(MsgParams messageParams);
    Task<IEnumerable<MsgDto>> GetMessageThread(string currentUserName, string recipientUserName);
    Task<bool> SaveAllAsync();
}
    