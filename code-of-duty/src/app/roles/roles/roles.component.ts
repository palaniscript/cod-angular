import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/confirm-dialog/confirm-dialog.component';
import { RolesService } from 'src/app/roles/roles/roles.service';
import { Role } from 'src/app/shared/model';
import { environment } from 'src/environments/environment';
import { NotificationsService } from 'src/notifications.service';
import { AddEditRoleComponent } from '../add-edit-role/add-edit-role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
})
export class RolesComponent implements OnInit {

  public displayedColumns: string[] = ['role', 'description', 'action'];
  public pageSizeOptions: number[] = environment.pageSizeOptions;
  public dataSource: MatTableDataSource<Role>;
  public columns: { header: string; columnDef: string; }[];
  private addEditDialogRef: MatDialogRef<AddEditRoleComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private readonly dialog: MatDialog,
    private readonly rolesService: RolesService,
    private readonly notification: NotificationsService
  ) {
  }

  ngOnInit() {
    this.loadRoles();
  }

  loadRoles(): void {
    this.rolesService.getRoles().subscribe((response: Role[]) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  addNewRole(): void {
    this.addEditDialogRef = this.dialog.open(AddEditRoleComponent, {
      data: {
        title: 'Add New Role',
        role: null
      },
      disableClose: true,
      panelClass: 'pm-dialog'
    });

    this.addEditDialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult && dialogResult.response) {
        this.loadRoles();
      }
    });
  }

  editRole(row: Role): void {
    this.addEditDialogRef = this.dialog.open(AddEditRoleComponent, {
      data: {
        title: 'Edit Role',
        role: row
      },
      disableClose: true,
      panelClass: 'pm-dialog'
    });

    this.addEditDialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult && dialogResult.response) {
        this.loadRoles();
      }
    });
  }

  deleteRole(row: Role): void {
    const message = `Are you sure you want to delete this role?`;
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

  private delete(role: Role): void {
    this.rolesService.deleteRole(role).subscribe(res => {
      this.notification.success('Role deleted successfully');
      this.loadRoles();
    });
  }
}
