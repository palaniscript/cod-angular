import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { forkJoin } from 'rxjs';
import { environment } from "src/environments/environment";
import { NotificationsService } from "src/notifications.service";
import { ConfirmDialogComponent, ConfirmDialogModel } from "../confirm-dialog/confirm-dialog.component";
import { RolesService } from "../roles/roles/roles.service";
import { User } from "../shared/model";
import { AddEditUserComponent } from "./add-edit-user/add-edit-user.component";
import { UsersService } from "./users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {

  public displayedColumns: string[] = ['username', 'email', 'roleName', 'status', 'action'];
  public pageSizeOptions: number[] = environment.pageSizeOptions;
  public dataSource: MatTableDataSource<User>;
  public columns: { header: string; columnDef: string; }[];
  private addEditDialogRef: MatDialogRef<AddEditUserComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly dialog: MatDialog,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly notification: NotificationsService
  ) {
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(): void {
    forkJoin([this.usersService.getUsers(), this.rolesService.getRoles()]).subscribe(([users, roles]) => {
      users.forEach(user => {
        const matchingRole = roles.find(role => role.id === user.role);
        user.roleName = matchingRole ? matchingRole.role : 'NA';
      });
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
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

  editUser(row: User): void {
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

  deleteUser(row: User): void {
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
        this.delete(row);
      }
    });
  }

  private delete(user: User): void {
    this.usersService.deleteUser(user).subscribe(res => {
      this.notification.success('User deleted successfully');
      this.loadUsers();
    });
  }
}
