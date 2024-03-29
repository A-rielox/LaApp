﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using App.DTOs;
using App.Entities;
using App.Extensions;
using App.Helpers;
using App.Interfaces;

namespace App.Controllers;

public class MessagesController : BaseController
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _uow;

    public MessagesController(IMapper mapper, IUnitOfWork uow)
    {
        _mapper = mapper;
        _uow = uow;
    }


    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // POST:  api/messages
    [HttpPost]
    public async Task<ActionResult<MsgDto>> CreateMessage(CreateMsgDto createMessageDto)
    {
        var username = User.GetUsername();

        if (username == createMessageDto.RecipientUsername.ToLower())
            return BadRequest("No puedes mandarte mensajes.");

        var sender = await _uow.UserRepository.GetUserByUsernameAsync(username);

        var recipient = await _uow.UserRepository.GetUserByUsernameAsync(createMessageDto.RecipientUsername);

        if (recipient == null) return NotFound();

        var message = new Msg
        {
            Sender = sender,
            Recipient = recipient,
            SenderUsername = sender.UserName,
            RecipientUsername = recipient.UserName,
            Content = createMessageDto.Content
            // EF va a rellenar sola las ids
        };

        _uow.MessageRepository.AddMessage(message);

        if (await _uow.Complete())
        {
            var msgDto = _mapper.Map<MsgDto>(message);

            return Ok(msgDto);
        }

        return BadRequest("No se pudo mandar el mensaje.");
    }


    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // GET:  api/messages
    [HttpGet]
    public async Task<ActionResult<PagedList<MsgDto>>> GetMessagesForUser(
                            [FromQuery] MsgParams messageParams)
    {
        messageParams.Username = User.GetUsername();

        var pagedMsgs = await _uow.MessageRepository.GetMessagesForUser(messageParams);

        Response.AddPaginationHeader(new PaginationHeader(pagedMsgs.CurrentPage,
                 pagedMsgs.PageSize, pagedMsgs.TotalCount, pagedMsgs.TotalPages));

        return Ok(pagedMsgs);
    }


    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // GET:  api/messages/thread/{username}
    [HttpGet("thread/{username}")]
    public async Task<ActionResult<IEnumerable<MsgDto>>> GetMessageThread(string username)
    {
        var currentUsername = User.GetUsername();

        var msgThread = await _uow.MessageRepository.GetMessageThread(currentUsername, username);

        // xel save q quite en el repository .GetMessageThread
        if (_uow.HasChanges()) await _uow.Complete();

        return Ok(msgThread);
    }


    ////////////////////////////////////////////////
    ///////////////////////////////////////////////////
    // DELETE:  api/messages/{id}
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteMessage(int id)
    {
        var username = User.GetUsername();

        var message = await _uow.MessageRepository.GetMessage(id);

        // p' asegurarme d que sea el q lo manda o lo recibe
        if (message.SenderUsername != username &&
            message.RecipientUsername != username)
        {
            return Unauthorized();
        }

        if (message.SenderUsername == username) message.SenderDeleted = true;
        if (message.RecipientUsername == username) message.RecipientDeleted = true;

        // en el repository si alguien borro de su lado un mensaje => NO se lo devuelvo

        if (message.SenderDeleted && message.RecipientDeleted)
        {
            _uow.MessageRepository.DeleteMessage(message);
        }

        if (await _uow.Complete()) return Ok();

        return BadRequest("Problemas al borrar el mensaje.");
    }
}
