import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Site } from 'src/app/shared/model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SitesService {

  constructor(private readonly http: HttpClient) { }

  getSites(site?): Observable<Site[]> {
    console.log("getsites",site)
    if (!site) {
      return this.http.get<Site[]>(environment.apiUrl + 'sites');
    } else {
      return this.http.get<Site[]>(environment.apiUrl + 'sites?Id=' + site);
    }
  }

  getSite(sitesId: number): Observable<Site> {
    return this.http.get<Site>(environment.apiUrl + 'sites/' + sitesId);
  }

  createSite(site: Site): Observable<Site> {
    console.log("create site")
    console.log(site)
    return this.http.post<Site>(environment.apiUrl + 'sites', site);
  }

  updateSite(siteData: Site, site: Site): Observable<Site> {
    console.log("service",siteData,site)
    return this.http.put<Site>(environment.apiUrl + 'sites/' + site.id, siteData);
  }

  deleteSite(site: Site): Observable<Site> {
    return this.http.delete<Site>(environment.apiUrl + 'sites/' + site.id);
  }

}
