import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
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
  userName: string;
  password: string;
  email: string;
  role: string;
  status: string
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public displayedColumns: string[] = ['userName', 'password', 'email', 'role', 'status', 'action'];
  public dataSource: MatTableDataSource<any>;
  public spinnerButtonOptions: MatProgressButtonOptions =
    { ...this.configService.spinnerButtonOptions, text: 'Refresh', buttonIcon: { fontIcon: 'refresh' } };
  public pageSizeOptions: number[] = environment.pageSizeOptions;
  private addEditDialogRef: MatDialogRef<AddEditUserComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columns: { header: string; columnDef: string; }[];
  users: { userName: string; password: string; email: string; status: string; role: string; }[];
  @Output() dialogResult: EventEmitter<any> = new EventEmitter();
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
        'userName': 'AZ-0001',
        'password': 'password123',
        'email': 'Dream_City_Glendale_Bridge@gmail.com',
        'role': 'Site Engineer',
        'status': 'active'
      },
      {
        'userName': 'AZ-0002',
        'password': 'password123',
        'email': 'Gym@gmail.com',
        'role': 'Site Engineer',
        'status': 'active'
      },
      {
        'userName': 'AZ-0003',
        'password': 'password123',
        'email': 'Sanctury@gmail.com',
        'role': 'Administrator',
        'status': 'active'
      },
      {
        'userName': 'AZ-0004',
        'password': 'password123',
        'email': 'Village@gmail.com',
        'role': 'Administrator',
        'status': 'active'
      }
    ];
    // this.dataSource = new MatTableDataSource(users);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource(ELEMENT_DATA); 
    
    this.columns = [
      {
        'header': 'User Name',
        'columnDef': 'userName'
      },
      {
        'header': 'Password',
        'columnDef': 'password'
      },
      {
        'header': 'Email',
        'columnDef': 'email'
      },
      {
        'header': 'Role',
        'columnDef': 'role'
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
    const obj = {
      sourceData: null,
      action: 'add'
    }
    this.addEditDialogRef = this.dialog.open(AddEditUserComponent, {
      data: {
        title: 'Add New User',
        user: obj,
        height: '550px'
      },
      disableClose: true,
      panelClass: 'pm-dialog'
    });

    this.addEditDialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult && dialogResult.data) {
        alert("134::::" + JSON.stringify(dialogResult.data));
        this.loadUsers();
      }
    });
  }

  editUser(row): void {
    console.log(row);
    this.addEditDialogRef = this.dialog.open(AddEditUserComponent, {
      data: {
        title: 'Edit User',
        user: row,
        height: '550px'
      },
      disableClose: true,
      panelClass: 'pm-dialog'
    });

    this.addEditDialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult && dialogResult.data) {
        
        console.log("149:::::" + JSON.stringify(dialogResult));
        this.dialogResult.next(dialogResult);
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
