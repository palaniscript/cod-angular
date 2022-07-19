import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { LocalStorageService } from './local-storage.service';
import { User } from './model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private readonly router: Router,
        private readonly http: HttpClient,
        private readonly localStorageService: LocalStorageService
    ) {
        this.userSubject = new BehaviorSubject<User>(this.localStorageService.get('user'));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<User>(`${environment.apiUrl}users/signin`, { username, password })
            .pipe(map(user => {
                this.localStorageService.set('user', user);
                this.userSubject.next(user);
                return user;
            }));
    }

    isAdmin() {
        return this.userValue.role === 1;
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next({});
        this.router.navigate(['login']);
    }
}