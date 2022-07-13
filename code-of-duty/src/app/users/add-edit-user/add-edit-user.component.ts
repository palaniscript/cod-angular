import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressButtonOptions } from 'mat-progress-buttons';
import { ErrorMessage, User } from 'src/app/shared/model';
import { ConfigService } from 'src/config.service';
import { NotificationsService } from 'src/notifications.service';
import { UsersService } from '../users.service';

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
  loading = false;
  // set  value(data) {
  //   this.userForm.setValue({username: data.username, password: data.password, 
  //     email: data.email, role: data.role, status: data.status});
  // }
  constructor(
    public readonly dialogRef: MatDialogRef<AddEditUserComponent>,
    private readonly notification: NotificationsService,
    private readonly configService: ConfigService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public userService: UsersService
  ) {
    this.userForm =  fb.group({
      'username': '',
      'password': '',
      'email': '',
      'role': '',
      'status': '',
    })
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: [''],
      email: [''],
      role: [''],
      status: ['']
    });
    if (this.data.user !== null && this.data.user?.action !== 'add') {
      this.fetchUser();
    }
  }

  fetchUser() {
    this.loading = true;
    this.userService.getUser(this.data.user.id).subscribe((response) => {
      this.loading = false;
      this.userForm.patchValue(response, {onlySelf: true, emitEvent: true});
      this.userForm.updateValueAndValidity();
    },
      error => {
        this.notification.error('Unable to fetch user details')
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    this.dialogRef.close({data: this.userForm.value});
    this.userForm.markAllAsTouched();
  }
}

