import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
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

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      LoginModalComponent,
      LikesComponent,
      MessagesComponent,
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
   providers: [],
   bootstrap: [AppComponent],
})
export class AppModule {}
