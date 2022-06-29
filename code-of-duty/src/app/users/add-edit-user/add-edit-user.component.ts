import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ErrorMessage, User } from 'src/app/shared/model';
import { ConfigService } from 'src/config.service';
import { NotificationsService } from 'src/notifications.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
})
export class AddEditUserComponent implements OnInit {

  public spinnerButtonOptions: MatProgressButtonOptions =
    { ...this.configService.spinnerButtonOptions, text: 'Save', buttonIcon: { fontIcon: 'save' } };
  public userForm = new FormGroup({});
  public model: User = {};
  public errors: ErrorMessage[] = [];

  constructor(
    public readonly dialogRef: MatDialogRef<AddEditUserComponent>,
    private readonly notification: NotificationsService,
    private readonly configService: ConfigService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.notification.success('User created successfully');
    this.dialogRef.close();
  }
}

