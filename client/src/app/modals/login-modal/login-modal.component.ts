import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';
import { PostsService } from 'src/app/_services/posts.service';
import { RecipesService } from 'src/app/_services/recipes.service';
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

   @Input() lang: string = 'Eng';
   // text: text = textEsp;

   constructor(
      private accountService: AccountService,
      private router: Router,
      private notification: NotificationsService,
      private memberService: MembersService,
      private recipesService: RecipesService,
      private postsService: PostsService
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

   // aca resetear los params, xsi se mete con otro user y asi resetear los filtros
   login() {
      this.memberService.resetUserParams();
      this.recipesService.resetRecipeParams();
      this.postsService.resetPostParams();

      this.accountService.login(this.loginForm).subscribe({
         next: () => {
            this.router.navigateByUrl('/members');

            this.notification.addNoti({
               severity: 'success',
               summary: 'Bienvenido.',
               detail: 'Que bueno tenerte de vuelta.',
            });
         },
         error: (err) => {},
      });

      this.visibleLogin = false;
   }
}
