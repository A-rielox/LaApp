import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavComponent } from './nav/nav.component';
import { PrimeModule } from './_prime/prime.module';
// import { SharedModule } from 'primeng/api';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { LikesComponent } from './likes/likes.component';
import { MessagesComponent } from './messages/messages.component';
import { MembersModule } from './members/members.module';
import { HomeModule } from './home/home.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { SharedModule } from './_shared/shared.module';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { PostsComponent } from './posts/posts.component';
import { PostDisplayComponent } from './posts/post-display/post-display.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDisplayComponent } from './recipes/recipe-display/recipe-display.component';
import { AddEditModule } from './add-edit/add-edit.module';
import { ShortenPipe } from './_pipes/shorten.pipe';
import { SeparatePipe } from './_pipes/separate.pipe';
import { IsOwnerOrAdminDirective } from './_directives/is-owner-or-admin.directive';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      LoginModalComponent,
      LikesComponent,
      MessagesComponent,
      TestErrorComponent,
      NotFoundComponent,
      ServerErrorComponent,
      AdminPanelComponent,
      HasRoleDirective,
      UserManagementComponent,
      PhotoManagementComponent,
      RolesModalComponent,
      PostsComponent,
      PostDisplayComponent,
      RecipesComponent,
      RecipeDisplayComponent,
      ShortenPipe,
      SeparatePipe,
      IsOwnerOrAdminDirective,
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      // SharedModule,
      PrimeModule,
      NotificationsModule,
      SharedModule,
      //
      MembersModule,
      HomeModule,

      AddEditModule,
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
   ],
   bootstrap: [AppComponent],
})
export class AppModule {}
