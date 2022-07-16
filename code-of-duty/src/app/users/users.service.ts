import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { apiResponse, User } from '../shared/model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  getUsers(username?): Observable<User[]> {
    if (!username) {
      return this.http.get<User[]>(environment.apiUrl + 'users');
    } else {
      return this.http.get<User[]>(environment.apiUrl + 'users?username=' + username);
    }
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(environment.apiUrl + 'users/' + userId);
  }

  createUser(user): Observable<User> {
    return this.http.post<User>(environment.apiUrl + 'users', user);
  }

  updateUser(userData, user): Observable<User> {
    return this.http.put<User>(environment.apiUrl + 'users/' + user.id, userData);
  }

  deleteUser(user: User): Observable<apiResponse> {
    return this.http.delete<apiResponse>(environment.apiUrl + 'users/' + user.id);
  }
}
