import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { PrimeModule } from '../_prime/prime.module';
import { MemberCardComponent } from './member-card/member-card.component';

@NgModule({
   declarations: [
      MemberListComponent,
      MemberDetailComponent,
      MemberCardComponent,
   ],
   imports: [CommonModule, PrimeModule],
   exports: [MemberListComponent, MemberDetailComponent],
})
export class MembersModule {}
