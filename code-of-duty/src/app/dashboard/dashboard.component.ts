import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationsService } from 'src/notifications.service';
import { RulesService } from '../rules/rules.service';
import { Site, SiteStatus } from '../shared/model';
import { SitesService } from '../sites/sites.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public appTitle = environment.appTitle;
  public displayedColumns: string[] = ['siteId', 'siteName', 'aeId', 'cewisId', 'status', 'action'];
  public pageSizeOptions: number[] = environment.pageSizeOptions;
  public dataSource: MatTableDataSource<Site>;
  public columns: { header: string; columnDef: string; }[];
  public summaryData = {
    totalUsers: 0,
    totalSites: 0,
    completedSites: 0,
    totalRules: 0
  };

  constructor(
    private readonly usersService: UsersService,
    private readonly sitesService: SitesService,
    private readonly rulesService: RulesService,
    private readonly notification: NotificationsService,
  ) { }

  ngOnInit(): void {
    this.loadSummary();
    this.loadSites()
  }

  getData(): Observable<any> {
    const users = this.usersService.getUsers();
    const sites = this.sitesService.getSites();
    const rules = this.rulesService.getRules();
    return forkJoin([users, sites, rules]);
  }

  loadSummary() {
    this.getData()
      .subscribe(response => {
        console.log(response);
        this.summaryData = {
          totalUsers: response[0].length,
          totalSites: response[1].length,
          completedSites: response[1].filter(site => site.status === SiteStatus.Completed).length,
          totalRules: response[2].length
        }
      }, err => {
        this.notification.error('Unable to fetch summary details');
      });
  }

  loadSites() {
    this.sitesService.getSites().subscribe((response: Site[]) => {
      const sortedSites = response.sort(this.compare);
      this.dataSource = new MatTableDataSource(sortedSites.slice(0, 5));
    });
  }

  private compare(a: Site, b: Site) {
    if (a.updatedAt < b.updatedAt) {
      return -1;
    }
    if (a.updatedAt > b.updatedAt) {
      return 1;
    }
    return 0;
  }

}
