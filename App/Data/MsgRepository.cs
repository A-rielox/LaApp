using App.DTOs;
using App.Entities;
using App.Helpers;
using App.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace App.Data;

public class MsgRepository : IMsgRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public MsgRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }



    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public void AddMessage(Msg message)
    {
        _context.Messages.Add(message);

    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public void DeleteMessage(Msg message)
    {
        _context.Messages.Remove(message);
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<Msg> GetMessage(int id)
    {
        var message = await _context.Messages.FindAsync(id);

        return message;
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<PagedList<MsgDto>> GetMessagesForUser(MsgParams messageParams)
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

        var messages = query.ProjectTo<MsgDto>(_mapper.ConfigurationProvider);

        var pagedMsgs = await PagedList<MsgDto>.CreateAsync(messages,
                            messageParams.PageNumber, messageParams.PageSize);

        return pagedMsgs;
    }

    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    //
    public async Task<IEnumerable<MsgDto>> GetMessageThread(string currentUserName, string recipientUserName)
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

            //await _context.SaveChangesAsync();  ---- x UnitOfWork guardo en el controller (MessagesController)
        }

        return _mapper.Map<IEnumerable<MsgDto>>(messages);
    }

    /*      previo projectTo
    public async Task<IEnumerable<MsgDto>> GetMessageThread(string currentUserName, string recipientUserName)
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

            //await _context.SaveChangesAsync();  ---- x UnitOfWork guardo en el controller (MessagesController)
        }

        return _mapper.Map<IEnumerable<MsgDto>>(messages);
    }
    */
}
