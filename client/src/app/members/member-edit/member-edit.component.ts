import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';
import { text, textEng, textEsp } from './memberEditLang';

@Component({
   selector: 'app-member-edit',
   templateUrl: './member-edit.component.html',
   styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
   @ViewChild('editForm') editForm: NgForm | undefined;
   member: Member | undefined;
   user: User | null = null;

   lang: string = 'Eng';
   text: text = textEng;

   constructor(
      private accountService: AccountService,
      private memberService: MembersService,
      private notification: NotificationsService // private intl: TimeagoIntl
   ) {
      // p' timeAgo en español
      // this.intl.strings = englishStrings;
      // this.intl.changes.next();

      this.accountService.currentUser$.pipe(take(1)).subscribe({
         next: (user) => {
            this.user = user;
         },
      });

      this.accountService.selectedLang$.subscribe({
         next: (lang) => {
            this.lang = lang;
            this.text = lang === 'Esp' ? textEsp : textEng;
         },
      });
   }

   ngOnInit(): void {
      this.loadMember();
   }

   loadMember() {
      if (!this.user) return;

      this.memberService.getMember(this.user.userName).subscribe({
         next: (member) => {
            this.member = member;
         },
      });
   }

   updateMember() {
      let notSummary = this.lang === 'Eng' ? 'Ready.' : 'Listo.';
      let notDetail =
         this.lang === 'Eng' ? 'Edited profile.' : 'Perfil Editado.';

      this.memberService.updateMember(this.editForm?.value).subscribe({
         next: () => {
            this.notification.addNoti({
               severity: 'success',
               summary: notSummary,
               detail: notDetail,
            });

            // p' quitar mensaje de advertencia y disabled el btn de guardar
            this.editForm?.reset(this.member);
         },
      });
   }
}
