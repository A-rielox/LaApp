import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/message';
import { Pagination } from '../_models/pagination';
import { MessageService } from '../_services/message.service';
import { AccountService } from '../_services/account.service';
import {
   Containers,
   containersEng,
   containersEsp,
   text,
   textEng,
   textEsp,
} from './messagesLang';

@Component({
   selector: 'app-messages',
   templateUrl: './messages.component.html',
   styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
   messages?: Message[];
   pagination?: Pagination;
   container = 'Inbox';
   pageNumber = 1;
   pageSize = 5;
   loading = false;

   lang: string = 'Eng';
   text: text = textEng;
   containers: Containers[] = containersEng;

   constructor(
      private accountService: AccountService,
      private messageService: MessageService // private intl: TimeagoIntl
   ) {
      // p' timeAgo en español
      // this.intl.strings = englishStrings;
      // this.intl.changes.next();

      this.accountService.selectedLang$.subscribe({
         next: (lang) => {
            this.lang = lang;

            this.text = lang === 'Esp' ? textEsp : textEng;

            this.containers = lang === 'Esp' ? containersEsp : containersEng;
         },
      });
   }

   ngOnInit(): void {
      this.loadMessages();
   }

   loadMessages() {
      this.loading = true;

      this.messageService
         .getMessages(this.pageNumber, this.pageSize, this.container)
         .subscribe({
            next: (res) => {
               this.messages = res.result;

               if (res.pagination!.totalPages > 1) {
                  this.pagination = res.pagination;
               } else {
                  this.pagination = undefined;
               }

               this.loading = false;
            },
         });
   }

   pageChanged(e: number) {
      this.pageNumber = e;
      this.loadMessages();
   }

   deleteMessage(id: number) {
      this.messageService.deleteMessage(id).subscribe({
         next: () =>
            this.messages?.splice(
               this.messages.findIndex((m) => m.id === id),
               1
            ),
      });
   }
}
