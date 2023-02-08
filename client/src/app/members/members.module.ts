import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { PrimeModule } from '../_prime/prime.module';
import { MemberCardComponent } from './member-card/member-card.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { FormsModule } from '@angular/forms';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
   declarations: [
      MemberListComponent,
      MemberDetailComponent,
      MemberCardComponent,
      MemberEditComponent,
      PhotoEditorComponent,
   ],
   imports: [CommonModule, PrimeModule, SharedModule, FormsModule],
   exports: [MemberListComponent, MemberDetailComponent, MemberCardComponent],
})
export class MembersModule {}
