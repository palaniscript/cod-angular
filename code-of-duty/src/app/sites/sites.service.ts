import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Site } from '../shared/model';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  constructor(private readonly http: HttpClient) { }

  getSites(siteName?): Observable<Site[]> {
    if (!siteName) {
      return this.http.get<Site[]>(environment.apiUrl + 'sites');
    } else {
      return this.http.get<Site[]>(environment.apiUrl + 'sites?siteName=' + siteName);
    }
  }
}
