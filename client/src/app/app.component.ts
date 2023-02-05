import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css'],
})
export class AppComponent {
   users: any;
   baseUrl = environment.apiUrl;

   constructor(
      private http: HttpClient,
      private accountService: AccountService
   ) {}

   ngOnInit(): void {
      this.getUsers();
      this.setCurrentUser();
   }

   getUsers() {
      this.http.get(this.baseUrl + 'users').subscribe({
         next: (res) => {
            this.users = res;
         },
      });
   }

   setCurrentUser() {
      const localUser = localStorage.getItem('user');

      if (!localUser) return;

      const user: User = JSON.parse(localUser);

      this.accountService.setCurrentUser(user);
   }
}
