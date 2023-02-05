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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
   constructor(
      private router: Router,
      private notification: NotificationsService
   ) {}

   intercept(
      request: HttpRequest<unknown>,
      next: HttpHandler
   ): Observable<HttpEvent<unknown>> {
      return next.handle(request).pipe(
         catchError((error: HttpErrorResponse) => {
            if (error) {
               switch (error.status) {
                  case 400:
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
                        detail: 'Sin Autorización.',
                     });

                     break;

                  case 404:
                     this.router.navigateByUrl('/not-found');

                     break;

                  case 500:
                     // p' mandar la info al componente al q redirecciono
                     const navigationExtras: NavigationExtras = {
                        state: { error: error.error },
                     };

                     this.router.navigateByUrl(
                        '/server-error',
                        navigationExtras
                     );

                     break;

                  default:
                     this.notification.addNoti({
                        severity: 'error',
                        summary: 'Error ' + error.status.toString(),
                        detail: 'Something unexpected went wrong.',
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
