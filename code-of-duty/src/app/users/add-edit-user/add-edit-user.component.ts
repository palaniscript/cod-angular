import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
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
  public formGroup: FormGroup;
  public siteId = new FormControl();

  constructor(
    public readonly dialogRef: MatDialogRef<AddEditUserComponent>,
    private readonly notification: NotificationsService,
    private readonly configService: ConfigService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group([
     // siteId: [''],
      
    ])
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.notification.success('User created successfully');
    this.dialogRef.close();
  }
}

