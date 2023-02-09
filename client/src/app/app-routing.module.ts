import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { LikesComponent } from './likes/likes.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminGuard } from './_guards/admin.guard';

const routes: Routes = [
   { path: '', component: HomeComponent },
   {
      path: '',
      runGuardsAndResolvers: 'always',
      canActivate: [AuthGuard],
      children: [
         { path: 'members', component: MemberListComponent },
         { path: 'members/edit', component: MemberEditComponent },
         { path: 'members/:username', component: MemberDetailComponent },
         { path: 'likes', component: LikesComponent },
         { path: 'messages', component: MessagesComponent },
         {
            path: 'admin',
            component: AdminPanelComponent,
            canActivate: [AdminGuard],
         },
      ],
   },
   { path: 'errors', component: TestErrorComponent },
   { path: 'not-found', component: NotFoundComponent },
   { path: 'server-error', component: ServerErrorComponent },
   { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
})
export class AppRoutingModule {}
