using App.DTOs;
using App.Entities;
using App.Helpers;
using App.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;

namespace App.Data;

public class MessageRepository : IMessageRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public MessageRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }



    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public void AddMessage(Message message)
    {
        _context.Messages.Add(message);

    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public void DeleteMessage(Message message)
    {
        _context.Messages.Remove(message);
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<Message> GetMessage(int id)
    {
        var message = await _context.Messages.FindAsync(id);

        return message;
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams)
    {
        var query = _context.Messages
            .OrderByDescending(m => m.MessageSent).AsQueryable();

        query = messageParams.Container switch
        {
            "Inbox" => query.Where(m => m.RecipientUsername == messageParams.Username &&
                                    m.RecipientDeleted == false),
            "Outbox" => query.Where(m => m.SenderUsername == messageParams.Username &&
                                    m.SenderDeleted == false),
            _ => query.Where(m => m.RecipientUsername == messageParams.Username &&
                                    m.RecipientDeleted == false && m.DateRead == null),
        };

        var messages = query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider);

        var pagedMsgs = await PagedList<MessageDto>.CreateAsync(messages,
                            messageParams.PageNumber, messageParams.PageSize);

        return pagedMsgs;
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<IEnumerable<MessageDto>> GetMessageThread(string currentUserName, string recipientUserName)
    {
        var messages = await _context.Messages
                        .Include(m => m.Sender).ThenInclude(u => u.Photos)
                        .Include(m => m.Recipient).ThenInclude(u => u.Photos)
                        .Where(
                            m => m.RecipientUsername == currentUserName && m.RecipientDeleted == false &&
                                 m.SenderUsername == recipientUserName ||
                                 m.RecipientUsername == recipientUserName && m.SenderDeleted == false &&
                                 m.SenderUsername == currentUserName)
                        .OrderBy(m => m.MessageSent)
                        .ToListAsync();

        var unreadMessages = messages.Where(m => m.DateRead == null &&
                m.RecipientUsername == currentUserName).ToList();

        if(unreadMessages.Any())
        {
            foreach (var message in unreadMessages)
            {
                message.DateRead = DateTime.UtcNow;
            }

            await _context.SaveChangesAsync();
        }

        return _mapper.Map<IEnumerable<MessageDto>>(messages);
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }
}
