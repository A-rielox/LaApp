using App.DTOs;
using App.Entities;
using App.Helpers;

namespace App.Interfaces;

public interface IMessageRepository
{
    void AddMessage(Message message);
    void DeleteMessage(Message message);
    Task<Message> GetMessage(int id);

    Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams);
    Task<IEnumerable<MessageDto>> GetMessageThread(string currentUserName, string recipientUserName);
    Task<bool> SaveAllAsync();
}
    