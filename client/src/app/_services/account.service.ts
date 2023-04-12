import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject, Subject, map } from 'rxjs';
import { LoginModel, RegisterModel } from '../_models/accountServ';

@Injectable({
   providedIn: 'root',
})
export class AccountService {
   baseUrl = environment.apiUrl;

   private currentUserSource = new BehaviorSubject<User | null>(null);
   currentUser$ = this.currentUserSource.asObservable();

   ////////
   selectedLang = new BehaviorSubject<string>('Eng');
   selectedLang$ = this.selectedLang.asObservable();

   constructor(private http: HttpClient) {}

   login(model: LoginModel) {
      return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
         map((res) => {
            const user = res;

            if (user) {
               this.setCurrentUser(user);
            }
         })
      );
   }

   register(model: RegisterModel) {
      // estoy pasando el confirmPass
      return this.http
         .post<User>(this.baseUrl + 'account/register', model)
         .pipe(
            map((user) => {
               if (user) {
                  this.setCurrentUser(user);
               }

               return user;
            })
         );
   }

   setCurrentUser(user: User) {
      user.roles = [];
      const roles = this.getDecodedToken(user.token).role;
      Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);

      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSource.next(user);
   }

   logout() {
      localStorage.removeItem('user');
      this.currentUserSource.next(null);
   }

   getDecodedToken(token: string) {
      return JSON.parse(atob(token.split('.')[1]));
   }
}
