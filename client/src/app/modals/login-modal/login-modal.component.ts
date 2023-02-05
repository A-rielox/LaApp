import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { NotificationsService } from 'src/app/notifications/notifications.service';

interface LoginForm {
   username: string;
   password: string;
}

@Component({
   selector: 'app-login-modal',
   templateUrl: './login-modal.component.html',
   styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit {
   loginForm: LoginForm = {} as LoginForm;
   visibleLogin = false;

   constructor(
      private accountService: AccountService,
      private router: Router, // private notification: NotificationsService
      private notification: NotificationsService
   ) {}

   ngOnInit(): void {
      // yellow QUITAR
      this.loginForm.username = 'lisa';
      this.loginForm.password = 'P@ssword1';
      // yellow QUITAR
   }

   openLogin() {
      this.visibleLogin = !this.visibleLogin;
   }

   login() {
      this.accountService.login(this.loginForm).subscribe({
         next: () => {
            this.router.navigateByUrl('/members');

            this.notification.addNoti({
               severity: 'success',
               summary: 'Bienvenido.',
               detail: 'Que bueno tenerte de vuelta.',
            });
         },
         error: (err) => {
            // ahora mando el error desde el interceptor
            // this.notification.addNoti({
            //    severity: 'error',
            //    summary: 'Error al entrar.',
            //    detail: err.error,
            // });
         },
      });

      this.visibleLogin = false;
   }
}
