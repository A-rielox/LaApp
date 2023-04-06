import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { LikesComponent } from './likes/likes.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home/home.component';
import { AuthGuard } from './_guards/auth.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AdminGuard } from './_guards/admin.guard';
import { RecipesComponent } from './recipes/recipes.component';
import { PostsComponent } from './posts/posts.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { AddRecipeComponent } from './add-edit/add-recipe/add-recipe.component';
import { AddPostComponent } from './add-edit/add-post/add-post.component';

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
         { path: 'recetas', component: RecipesComponent },
         { path: 'posts', component: PostsComponent },
         { path: 'likes', component: LikesComponent },
         { path: 'messages', component: MessagesComponent },
         {
            path: 'add-edit',
            component: AddEditComponent,
            children: [
               { path: 'recipe', component: AddRecipeComponent },
               { path: 'post', component: AddPostComponent },
            ],
         },
         {
            path: 'admin',
            component: AdminPanelComponent,
            canActivate: [AdminGuard],
         },
      ],
   },
   { path: 'not-found', component: NotFoundComponent },
   { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
   imports: [
      RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
   ],
   exports: [RouterModule],
})
export class AppRoutingModule {}
