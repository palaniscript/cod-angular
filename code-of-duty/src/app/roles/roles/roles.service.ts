import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from 'src/app/shared/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private readonly http: HttpClient) { }

  getRoles(role?): Observable<Role[]> {
    if (!role) {
      return this.http.get<Role[]>(environment.apiUrl + 'roles');
    } else {
      return this.http.get<Role[]>(environment.apiUrl + 'roles?role=' + role);
    }
  }

  getRole(roleId: number): Observable<Role> {
    return this.http.get<Role>(environment.apiUrl + 'roles/' + roleId);
  }

  createRole(role: Role): Observable<Role> {
    return this.http.post<Role>(environment.apiUrl + 'roles', role);
  }

  updateRole(roleData: Role, role: Role): Observable<Role> {
    return this.http.put<Role>(environment.apiUrl + 'roles/' + role.id, roleData);
  }

  deleteRole(role: Role): Observable<Role> {
    return this.http.delete<Role>(environment.apiUrl + 'roles/' + role.id);
  }

}
