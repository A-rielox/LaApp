import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';
import { text, textEng, textEsp } from './memberDetailLang';

@Component({
   selector: 'app-member-detail',
   templateUrl: './member-detail.component.html',
   styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
   // @ViewChild('memberTabs') memberTabs?: TabView;
   member: Member | undefined;
   messages: Message[] = [];

   images: any[] = [];
   responsiveOptions: any[] = [
      {
         breakpoint: '1024px',
         numVisible: 4,
      },
      {
         breakpoint: '768px',
         numVisible: 3,
      },
      {
         breakpoint: '560px',
         numVisible: 1,
      },
   ];

   activeTabIndex: number = 0;

   lang: string = 'Eng';
   text: text = textEng;

   constructor(
      private memberService: MembersService,
      private messageService: MessageService,
      private route: ActivatedRoute,
      public accountService: AccountService // private intl: TimeagoIntl
   ) {
      // p' timeAgo en español
      // this.intl.strings = englishStrings;
      // this.intl.changes.next();

      this.accountService.selectedLang$.subscribe({
         next: (lang) => {
            this.lang = lang;
            this.text = lang === 'Esp' ? textEsp : textEng;
         },
      });
   }

   ngOnInit(): void {
      this.loadMember();

      // p' cuando le pican al sobre en la card o a un mensaje
      this.route.queryParams.subscribe({
         next: (queryParams) => {
            if (queryParams['tab'] === 'Mensajes') {
               this.selectTab();
            }
         },
      });
   }

   loadMember() {
      const username = this.route.snapshot.paramMap.get('username');
      if (!username) return;

      this.memberService.getMember(username).subscribe({
         next: (member) => {
            this.member = member;

            this.images = this.getImages();

            this.loadMessages();
         },
      });
   }

   getImages() {
      if (!this.member) return [];

      const imgsUrls = [];

      for (const photo of this.member.photos) {
         imgsUrls.push({
            previewImageSrc: photo.url,
            thumbnailImageSrc: photo.url,
            alt: photo.id,
            title: photo.id,
         });
      }

      return imgsUrls;
   }

   selectTab() {
      // en indice 2 tengo Mensajes
      this.activeTabIndex = 2;
   }

   loadMessages() {
      if (this.member) {
         this.messageService.getMessageThread(this.member.userName).subscribe({
            next: (messages) => (this.messages = messages),
         });
      }
   }

   // onTabChanged(e: any) {
   // yellow   ERA P' Q NO CARGUE MENSAJES HASTA QUE SE ENTRE EN LA PESTAÑA
   // yellow p' mejor los cargo junto con el componente

   // console.log(e.originalEvent.srcElement.firstElementChild.innerText);
   // const activeTab = e.originalEvent.srcElement.firstElementChild.innerText;
   // if (activeTab === 'Mensajes') {
   //    this.loadMessages();
   // }
   // }
}

// { path: 'miembros/:username', component: MemberDetailComponent },
