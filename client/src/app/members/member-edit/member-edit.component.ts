import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';

@Component({
   selector: 'app-member-edit',
   templateUrl: './member-edit.component.html',
   styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
   @ViewChild('editForm') editForm: NgForm | undefined;
   member: Member | undefined;
   user: User | null = null;

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
      console.log(this.editForm?.value);

      // this.memberService.updateMember(this.editForm?.value).subscribe({
      //    next: () => {
      //       this.notification.addNoti({
      //          severity: 'success',
      //          summary: 'Listo.',
      //          detail: 'Perfil Editado.',
      //       });
      //       // p' quitar mensaje de advertencia y disabled el btn de guardar
      //       this.editForm?.reset(this.member);
      //    },
      // });
   }
}
