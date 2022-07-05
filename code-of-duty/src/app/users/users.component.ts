import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ConfigService } from 'src/config.service';
import { environment } from 'src/environments/environment';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../confirm-dialog/confirm-dialog.component';
import { User } from '../shared/model';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UsersService } from './users.service';
import { NotificationsService } from 'src/notifications.service';

export interface UserElement {
  siteId: string;
  siteName: string;
  Ex1cewisid: string;
  status: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public displayedColumns: string[] = ['siteId', 'siteName', 'Ex1cewisid', 'status', 'action'];
  public dataSource: MatTableDataSource<any>;
  public spinnerButtonOptions: MatProgressButtonOptions =
    { ...this.configService.spinnerButtonOptions, text: 'Refresh', buttonIcon: { fontIcon: 'refresh' } };
  public pageSizeOptions: number[] = environment.pageSizeOptions;
  private addEditDialogRef: MatDialogRef<AddEditUserComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columns: { header: string; columnDef: string; }[];
  users: { siteId: string; siteName: string; Ex1cewisid: string; status: string; }[];

  constructor(
    private configService: ConfigService,
    private dialog: MatDialog,
    //public usersService: UsersService,
    private readonly notification: NotificationsService,
  ) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.spinnerButtonOptions.active = true;
    const ELEMENT_DATA: UserElement[] = [
      {
        'siteId': 'AZ-0001',
        'siteName': 'Dream City Glendale (Bridge)',
        'Ex1cewisid': 'Dream_City_Glendale_Bridge',
        'status': 'Completed'
      },
      {
        'siteId': 'AZ-0002',
        'siteName': 'Dream City Glendale (Gym)',
        'Ex1cewisid': 'Gym',
        'status': 'Open'
      },
      {
        'siteId': 'AZ-0003',
        'siteName': 'Dream City Glendale (Sanctury)',
        'Ex1cewisid': 'Sanctury',
        'status': 'Open'
      },
      {
        'siteId': 'AZ-0004',
        'siteName': 'Dream City Glendale (Village)',
        'Ex1cewisid': 'Village',
        'status': 'Open'
      }
    ];
    // this.dataSource = new MatTableDataSource(users);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource(ELEMENT_DATA); 
    
    this.columns = [
      {
        'header': 'Site Id',
        'columnDef': 'siteId'
      },
      {
        'header': 'Site Name',
        'columnDef': 'siteName'
      },
      {
        'header': 'Ex1cewisid',
        'columnDef': 'Ex1cewisid'
      },
      {
        'header': 'Status',
        'columnDef': 'status'
      }
    ]
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.spinnerButtonOptions.active = false;
  }

  addNewUser(): void {
    this.addEditDialogRef = this.dialog.open(AddEditUserComponent, {
      data: {
        title: 'Add New User',
        user: null
      },
      disableClose: true,
      panelClass: 'pm-dialog'
    });

    this.addEditDialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult && dialogResult.response) {
        this.loadUsers();
      }
    });
  }

  editUser(row): void {
    console.log(row);
    this.addEditDialogRef = this.dialog.open(AddEditUserComponent, {
      data: {
        title: 'Edit User',
        user: row
      },
      disableClose: true,
      panelClass: 'pm-dialog'
    });

    this.addEditDialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult && dialogResult.response) {
        this.loadUsers();
      }
    });
  }

  deleteUser(row): void {
    console.log(row);
    const message = `Are you sure you want to delete this user?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
      width: '33vw',
      disableClose: true,
      panelClass: 'confirmation-dialog'
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
       // this.delete(row.id);
      }
    });
  }

  // private delete(userId): void {
  //   this.usersService.deleteUser(userId).subscribe(res => {
  //     if (res.success) {
  //       this.notification.success(res.message || '');
  //       this.loadUsers();
  //     } else {
  //       if (typeof res.message === "string") {
  //         this.notification.error(res.message);
  //       }
  //     }
  //   });
  // }

}
