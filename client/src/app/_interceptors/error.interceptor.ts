import { Injectable } from '@angular/core';
import {
   HttpRequest,
   HttpHandler,
   HttpEvent,
   HttpInterceptor,
   HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { NotificationsService } from '../notifications/notifications.service';
import { AccountService } from '../_services/account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
   lang: string = 'Eng';

   constructor(
      private router: Router,
      private notification: NotificationsService,
      private accountService: AccountService
   ) {
      accountService.selectedLang$.subscribe({
         next: (lang) => {
            this.lang = lang;
         },
      });
   }

   intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler
   ): Observable<HttpEvent<unknown>> {
      let detail400 =
         this.lang === 'Eng'
            ? 'Error in filled fields'
            : 'Error en los campos llenados.';
      let detail401 =
         this.lang === 'Eng' ? 'Without authorization.' : 'Sin Autorización.';
      let detail500 =
         this.lang === 'Eng'
            ? 'Something unexpected went wrong.'
            : 'Algo inesperado salió mal.';

      return next.handle(request).pipe(
         catchError((error: HttpErrorResponse) => {
            if (error) {
               switch (error.status) {
                  case 400:
                     if (error.error && Array.isArray(error.error)) {
                        console.log(error.error);

                        const modalStateErrors = [];

                        for (const key in error.error) {
                           if (error.error[key]) {
                              modalStateErrors.push(error.error[key]);
                           }
                        }

                        this.notification.addNoti({
                           severity: 'error',
                           summary: 'Error ' + error.status.toString(),
                           detail: detail400,
                        });

                        // el error q tiro aca se agarra en el ".subscribe({ error: ... })" ( en el error del subscribe del request )
                        throw modalStateErrors.flat();

                        /* 
                        if (error.error.errors) {
                        const modalStateErrors = [];

                        for (const key in error.error.errors) {
                           if (error.error.errors[key]) {
                              modalStateErrors.push(error.error.errors[key]);
                           }
                        }

                        this.notification.addNoti({
                           severity: 'error',
                           summary: 'Error ' + error.status.toString(),
                           detail: 'Error en los campos llenados.',
                        });

                        // el error q tiro aca se agarra en el ".subscribe({ error: ... })" ( en el error del subscribe del request )
                        throw modalStateErrors.flat();
                        */
                     } else {
                        this.notification.addNoti({
                           severity: 'error',
                           summary: 'Error ' + error.status.toString(),
                           detail: error.error,
                        });
                     }

                     break;

                  case 401:
                     this.notification.addNoti({
                        severity: 'error',
                        summary: 'Error ' + error.status.toString(),
                        detail: detail401,
                     });

                     break;

                  case 404:
                     this.router.navigateByUrl('/not-found');

                     break;

                  case 500:
                     // p' mandar la info al componente al q redirecciono
                     // const navigationExtras: NavigationExtras = {
                     //    state: { error: error.error },
                     // };

                     // this.router.navigateByUrl(
                     //    '/server-error',
                     //    navigationExtras
                     // );

                     this.router.navigateByUrl('/');

                     break;

                  default:
                     this.notification.addNoti({
                        severity: 'error',
                        summary: 'Error ' + error.status.toString(),
                        detail: detail500,
                     });

                     console.log(error);

                     break;
               }
            }

            // return throwError(error);
            throw error;
         })
      );
   }
}
