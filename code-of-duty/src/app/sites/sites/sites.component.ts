import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/confirm-dialog/confirm-dialog.component';
import { SitesService } from 'src/app/sites/sites/sites.service';
import { Site } from 'src/app/shared/model';
import { environment } from 'src/environments/environment';
import { NotificationsService } from 'src/notifications.service';
import { AddEditSiteComponent } from '../add-edit-site/add-edit-site.component';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {

  public displayedColumns: string[] = ['siteId', 'siteName', 'cewisId','status','action'];
  public pageSizeOptions: number[] = environment.pageSizeOptions;
  public dataSource: MatTableDataSource<Site>;
  public columns: { header: string; columnDef: string; }[];
  private addEditDialogRef: MatDialogRef<AddEditSiteComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private readonly dialog: MatDialog,
    private readonly siteService: SitesService,
    private readonly notification: NotificationsService
  ) {
  }

  ngOnInit() {
    this.loadSites();
  }

  loadSites(): void {
    this.siteService.getSites().subscribe((response: Site[]) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  addNewSite(): void {
    this.addEditDialogRef = this.dialog.open(AddEditSiteComponent, {
      data: {
        title: 'Add New Site',
        site: null
      },
      disableClose: true,
      panelClass: 'pm-dialog'
    });

    this.addEditDialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult && dialogResult.response) {
        this.loadSites();
      }
    });
   }

  editSite(row: Site): void {
    this.addEditDialogRef = this.dialog.open(AddEditSiteComponent, {
      data: {
        title: 'Edit Site',
        site: row
      },
      disableClose: true,
      panelClass: 'pm-dialog'
    });

    this.addEditDialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult && dialogResult.response) {
        this.loadSites();
      }
    });
   }

  deleteSite(row: Site): void {
    const message = `Are you sure you want to delete this site?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
      width: '33vw',
      disableClose: true,
      panelClass: 'confirmation-dialog'
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.delete(row);
      }
    });
  }

  private delete(site: Site): void {
    this.siteService.deleteSite(site).subscribe(res => {
      this.notification.success('Site deleted successfully');
      this.loadSites();
    });
  }
}
