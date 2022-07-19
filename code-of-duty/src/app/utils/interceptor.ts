import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { NotificationsService } from 'src/notifications.service';
import { environment } from '../../environments/environment';
import { LoaderService } from '../shared/loader.service';
import { AuthService } from '../shared/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private readonly authService: AuthService,
        private readonly loaderService: LoaderService,
        private readonly notificationService: NotificationsService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();

        const user = this.authService.userValue;
        const isLoggedIn = user && user.accessToken;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    'x-access-token': user.accessToken,
                    'Content-Type': 'application/json',
                }
            });
        }
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status == 401) {
                    this.authService.logout();
                }
                this.notificationService.error(err.message);
                return throwError(err);
            }),
            finalize(() => this.loaderService.hide()),
        );
    }
}