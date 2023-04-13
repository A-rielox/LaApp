import { Component, OnChanges, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import {
   Sorting,
   sortingOptsEng,
   sortingOptsEsp,
   text,
   textEng,
   textEsp,
} from './memberListLang';

@Component({
   selector: 'app-member-list',
   templateUrl: './member-list.component.html',
   styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
   members: Member[] = [];
   pagination: Pagination | undefined; // p'paginator en .html
   userParams: UserParams | undefined; // aqui estan los filtros

   sortingOpts: Sorting[] = sortingOptsEng;

   //    LANG
   text: text = textEng;

   constructor(
      private memberService: MembersService,
      public accountService: AccountService
   ) {
      this.userParams = this.memberService.getUserParams();

      //    LANG
      this.accountService.selectedLang$.subscribe({
         next: (lang) => {
            this.text = lang === 'Esp' ? textEsp : textEng;
            this.sortingOpts = lang === 'Esp' ? sortingOptsEsp : sortingOptsEng;
         },
      });
   }

   ngOnInit(): void {
      // this.members$ = this.memberService.getMembers();
      this.loadMembers();
   }

   loadMembers() {
      if (this.userParams) {
         // 1ro los pongo xsi los he cambiado
         this.memberService.setUserParams(this.userParams);

         this.memberService.getMembers(this.userParams).subscribe({
            next: (res) => {
               if (res.result && res.pagination) {
                  this.members = res.result;
                  this.pagination = res.pagination;
               }
            },
         });
      }
   }

   resetFilters() {
      this.userParams = this.memberService.resetUserParams();
      this.loadMembers();
   }

   pageChanged(e: number) {
      if (!this.userParams) return;

      this.userParams.pageNumber = e;

      this.memberService.setUserParams(this.userParams);

      this.loadMembers();
   }
}
