import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatListOption } from '@angular/material/list';
import { map, Observable, startWith } from 'rxjs';
import { NotificationsService } from 'src/notifications.service';
import { RulesService } from '../rules/rules.service';
import { Rule, RuleValidationStatus, Site } from '../shared/model';
import { SitesService } from '../sites/sites.service';

@Component({
  selector: 'app-triage',
  templateUrl: './triage.component.html',
  styleUrls: ['./triage.component.scss'],
})
export class TriageComponent implements OnInit {
  siteControl = new FormControl<string | Site>('');
  sites: Site[];
  filteredSites: Observable<Site[]>;
  rules: Rule[];
  selectedRules: Rule[];

  constructor(
    private readonly dialog: MatDialog,
    private readonly rulesService: RulesService,
    private readonly sitesService: SitesService,
    private readonly notification: NotificationsService
  ) {}

  ngOnInit(): void {
    this.loadSites();
    this.loadRules();
  }

  displayFn(site: Site): string {
    return site && site.siteName ? site.siteName : '';
  }

  private _filter(siteName: string): Site[] {
    const filterValue = siteName.toLowerCase();

    return this.sites.filter((option: Site) =>
      option.siteName ? option.siteName.toLowerCase().includes(filterValue) : ''
    );
  }

  loadSites() {
    this.sitesService.getSites().subscribe((response: Site[]) => {
      this.sites = response;
      this.filteredSites = this.siteControl.valueChanges.pipe(
        startWith(''),
        map((value) => {
          const siteName = typeof value === 'string' ? value : value?.siteName;
          return siteName
            ? this._filter(siteName as string)
            : this.sites.slice();
        })
      );
    });
  }

  private loadRules() {
    this.rulesService.getRules().subscribe((response: Rule[]) => {
      response.map((rule) => (rule.status = RuleValidationStatus.OPEN));
      this.rules = response;
    });
  }

  onSelectionChange(rules: MatListOption[]) {
    this.selectedRules = rules.map((rule) => rule.value);
  }

  onSubmit() {
    const selectedSite = this.siteControl.value;
    if (this.selectedRules && this.selectedRules.length > 0 && selectedSite) {
      this.triageSite();
    } else {
      this.notification.error(
        'Please select a site and rules to start triaging'
      );
    }
  }

  getStatusClass(status: RuleValidationStatus) {
    return RuleValidationStatus[status];
  }

  triageSite() {
    const rules = this.selectedRules;
    let selectedSite = this.siteControl.value;
    rules.forEach((rule) => {
      console.log('validate', rule);
      if (rule.checkType === 'count') {
        rule.status = RuleValidationStatus.INPROGRESS;
        let endPoint = rule.endPoint;
        if (endPoint.includes('{') && rule.endPoint?.includes('}')) {
          const paramName = endPoint.split('{').pop().split('}')[0];
          endPoint = endPoint.replace('{' + paramName+ '}', selectedSite[paramName]);
        }
        this.rulesService.getData(endPoint).subscribe((apiResponse) => {
          rule.status =
          apiResponse.length > 0
                  ? RuleValidationStatus.PASS
                  : RuleValidationStatus.FAIL;
        }, (error) => (rule.status = RuleValidationStatus.FAILED));
      } else if (rule.checkType === 'data') {
        rule.status = RuleValidationStatus.INPROGRESS;
        this.rulesService.getData(rule.endPoint).subscribe(
          (apiResponse) => {
            const sourceProperty = rule.source || '';
            const responseProperty = rule.response || '';
            const sourceValue = selectedSite
              ? selectedSite[sourceProperty]
              : null;
            if (apiResponse) {
              const dataExists = apiResponse.filter(
                (resp) => resp[responseProperty] === sourceValue
              );
              rule.status =
                dataExists.length > 0
                  ? RuleValidationStatus.PASS
                  : RuleValidationStatus.FAIL;
            } else {
              rule.status = RuleValidationStatus.FAIL;
            }
          },
          (error) => (rule.status = RuleValidationStatus.FAILED)
        );
      }
    });
  }
}
