import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { PrimeModule } from '../_prime/prime.module';
import { MemberCardComponent } from './member-card/member-card.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
   declarations: [
      MemberListComponent,
      MemberDetailComponent,
      MemberCardComponent,
      MemberEditComponent,
   ],
   imports: [CommonModule, PrimeModule, FormsModule],
   exports: [MemberListComponent, MemberDetailComponent],
})
export class MembersModule {}
