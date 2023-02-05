import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NavComponent } from './nav/nav.component';
import { PrimeModule } from './_prime/prime.module';
import { SharedModule } from 'primeng/api';
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
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule,
      PrimeModule,
      NotificationsModule,
      //
      MembersModule,
      HomeModule,
   ],
   providers: [
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
   ],
   bootstrap: [AppComponent],
})
export class AppModule {}
