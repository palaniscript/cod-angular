import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
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
  //public userForm = new FormGroup({});
  userForm: FormGroup;
  public model: User = {};
  public errors: ErrorMessage[] = [];
  set  value(data) {
    this.userForm.setValue({userName: data.userName, password: data.password, 
      email: data.email, role: data.role, status: data.status});
  }
  constructor(
    public readonly dialogRef: MatDialogRef<AddEditUserComponent>,
    private readonly notification: NotificationsService,
    private readonly configService: ConfigService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {
    this.userForm =  fb.group({
      'userName': '',
      'password': '',
      'email': '',
      'role': '',
      'status': '',
    })
  }

  ngOnInit() {
    this.userForm.patchValue(this.data.user, {onlySelf: true, emitEvent: true});
    this.userForm.updateValueAndValidity();
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    alert(JSON.stringify(this.userForm.value));
    this.notification.success('User created successfully');
    this.dialogRef.close({data: this.userForm.value});
  }
}

