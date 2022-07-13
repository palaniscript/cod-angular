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
  username: string;
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
  public displayedColumns: string[] = ['username', 'password', 'email', 'role', 'status', 'action'];
  public dataSource: MatTableDataSource<any>;
  public spinnerButtonOptions: MatProgressButtonOptions =
    { ...this.configService.spinnerButtonOptions, text: 'Refresh', buttonIcon: { fontIcon: 'refresh' } };
  public pageSizeOptions: number[] = environment.pageSizeOptions;
  private addEditDialogRef: MatDialogRef<AddEditUserComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  columns: { header: string; columnDef: string; }[];
  users: { username: string; password: string; email: string; status: string; role: string; }[];
  @Output() dialogResult: EventEmitter<any> = new EventEmitter();
  loading = false;

  constructor(
    private configService: ConfigService,
    private dialog: MatDialog,
    private readonly usersService: UsersService,
    private readonly notification: NotificationsService,
  ) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    this.spinnerButtonOptions.active = true;
    this.columns = [
      {
        'header': 'User Name',
        'columnDef': 'username'
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
    this.loading = true;
    this.usersService.getUsers().subscribe((response: User[]) => {
      this.loading = false;
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
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
      if (dialogResult && dialogResult?.['data'] && dialogResult?.['data'] !== null) {
        this.loading = true;
        this.usersService.createUser(dialogResult?.['data']).subscribe((response) => {
              this.loading = false;
              this.notification.success('Role created successfully');
              //this.dialogRef.close({ response: true });
            }, error => {
              this.loading = false;
              this.notification.error('Unable to create the role')
            });
          }
        }
    );
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
      if (dialogResult && dialogResult?.['data'] && dialogResult?.['data'] !== null) {
        this.loading = true;
        setTimeout(() => {
          this.usersService.updateUser(dialogResult?.['data'], row).subscribe((response) => {
            this.loading = false;
            this.notification.success('User updated successfully');
           // this.dialogRef.close({ response: true });
            this.loadUsers();
          }, error => {
            this.loading = false;
            this.notification.error('Unable to update the user')
          });
        }, 5000);
      } 
      // else {
      //   this.rolesService.createRole(this.roleForm.value).subscribe((response: Role) => {
      //     this.loading = false;
      //     this.notification.success('Role created successfully');
      //     this.dialogRef.close({ response: true });
      //   }, error => {
      //     this.notification.error('Unable to create the role')
      //   });
      // }
   // }
  })
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
        this.delete(dialogResult, row);
      }
    });
  }

  private delete(userId, row): void {
    this.usersService.deleteUser(row.id).subscribe(res => {
      this.loading = true;
      if (res.success) {
        this.loading = false;
        this.notification.success(res.message || '');
        this.loadUsers();
      } else {
        this.loading = false;
        if (typeof res.message === "string") {
          this.notification.error(res.message);
        }
      }
    });
  }

}
