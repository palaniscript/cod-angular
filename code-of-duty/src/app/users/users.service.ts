import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { apiResponse, User, UserResponse, UsersResponse } from '../shared/model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  getUsers(user?): Observable<User[]> {
    if (!user) {
      return this.http.get<User[]>(environment.apiUrl + 'users');
    } else {
      return this.http.get<User[]>(environment.apiUrl + 'users?user=' + user);
    }
  }

  getUser(userId: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(environment.apiUrl + 'users/' + userId);
  }

  createUser(user): Observable<apiResponse> {
    return this.http.post<apiResponse>(environment.apiUrl + 'users', user);
  }

  updateUser(userData, user): Observable<apiResponse> {
    return this.http.put<apiResponse>(environment.apiUrl + 'users/' + user.id, userData);
  }

  deleteUser(userId): Observable<apiResponse> {
    return this.http.delete<apiResponse>(environment.apiUrl + 'users/' + userId);
  }
}
