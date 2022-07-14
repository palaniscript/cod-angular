import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/confirm-dialog/confirm-dialog.component';
import { environment } from 'src/environments/environment';
import { NotificationsService } from 'src/notifications.service';
import { AddEditRuleComponent } from '../add-edit-rule/add-edit-rule.component';
import { RulesService } from '../rules.service';
import { Rule } from 'src/app/shared/model';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
})
export class RulesComponent implements OnInit {

  public displayedColumns: string[] = ['title', 'checkType', 'system', 'createdAt', 'action'];
  public pageSizeOptions: number[] = environment.pageSizeOptions;
  public dataSource: MatTableDataSource<Rule>;
  public columns: { header: string; columnDef: string; }[];
  private addEditDialogRef: MatDialogRef<AddEditRuleComponent>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly dialog: MatDialog,
    private readonly rulesService: RulesService,
    private readonly notification: NotificationsService
  ) {
  }

  ngOnInit() {
    this.loadRules();
  }

  loadRules(): void {
    this.rulesService.getRules().subscribe((response: Rule[]) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  addNewRule(): void {
    this.addEditDialogRef = this.dialog.open(AddEditRuleComponent, {
      data: {
        title: 'Add New Rule',
        rule: null
      },
      disableClose: true,
      panelClass: 'pm-dialog'
    });

    this.addEditDialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult && dialogResult.response) {
        this.loadRules();
      }
    });
  }

  editRule(row: Rule): void {
    this.addEditDialogRef = this.dialog.open(AddEditRuleComponent, {
      data: {
        title: 'Edit Rule',
        rule: row
      },
      disableClose: true,
      panelClass: 'pm-dialog'
    });

    this.addEditDialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult && dialogResult.response) {
        this.loadRules();
      }
    });
  }

  deleteRule(row: Rule): void {
    const message = `Are you sure you want to delete this rule?`;
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

  private delete(rule: Rule): void {
    this.rulesService.deleteRule(rule).subscribe(res => {
      this.notification.success('Rule deleted successfully');
      this.loadRules();
    });
  }

}
