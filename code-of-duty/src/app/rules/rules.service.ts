import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rule } from '../shared/model';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  constructor(private readonly http: HttpClient) { }

  getRules(title?): Observable<Rule[]> {
    if (!title) {
      return this.http.get<Rule[]>(environment.apiUrl + 'rules');
    } else {
      return this.http.get<Rule[]>(environment.apiUrl + 'rules?title=' + title);
    }
  }

  getRule(ruleId: number): Observable<Rule> {
    return this.http.get<Rule>(environment.apiUrl + 'rules/' + ruleId);
  }

  createRule(rule: Rule): Observable<Rule> {
    return this.http.post<Rule>(environment.apiUrl + 'rules', rule);
  }

  updateRule(ruleData: Rule, rule: Rule): Observable<Rule> {
    return this.http.put<Rule>(environment.apiUrl + 'rules/' + rule.id, ruleData);
  }

  deleteRule(rule: Rule): Observable<Rule> {
    return this.http.delete<Rule>(environment.apiUrl + 'rules/' + rule.id);
  }

  getData(endPoint): Observable<any> {
    return this.http.get(endPoint);
  }
}
