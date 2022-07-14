import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from './model';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    

    constructor(
        private router: Router,
        private http: HttpClient,
        private localStorageService: LocalStorageService
    ) {
        this.userSubject = new BehaviorSubject<User>(this.localStorageService.get('user'));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username, password) {
        return this.http.post<User>(`${environment.apiUrl}users/signin`, { username, password })
            .pipe(map(user => {
                this.localStorageService.set('user', user);
                this.userSubject.next(user);
                return user;
            }));
    }

}