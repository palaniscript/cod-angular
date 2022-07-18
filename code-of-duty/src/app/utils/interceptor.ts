import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoaderService } from '../shared/loader.service';
import { LoginService } from '../shared/login.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private readonly loginService: LoginService,
        private readonly loaderService: LoaderService,
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();

        const user = this.loginService.userValue;
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
                    this.loginService.logout();
                }
                return throwError(err);
            }),
            finalize(() => this.loaderService.hide()),
        );
    }
}