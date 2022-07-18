import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { RolesService } from "src/app/roles/roles/roles.service";
import { ErrorMessage, Role, User } from "src/app/shared/model";
import { NotificationsService } from "src/notifications.service";
import { existingUsernameValidator } from '../custom-validators/existing-username-validator';
import { UsernameSpaceValidator } from "../custom-validators/username-sapce-validator";
import { UsersService } from "../users.service";

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
})
export class AddEditUserComponent implements OnInit {

  public errors: ErrorMessage[] = [];
  public userForm: FormGroup;
  public loading = false;
  public roles: Role[];
  public status: string[] = ['ACTIVE', 'INACTIVE'];
  private fetchedUser: User;

  constructor(
    public readonly dialogRef: MatDialogRef<AddEditUserComponent>,
    private readonly notification: NotificationsService,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.fetchRoles();
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required, UsernameSpaceValidator.cannotContainSpace], [existingUsernameValidator(this.usersService, this.data.user)]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
      role: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });
    if (this.data.user !== null) {
      this.fetchUser();
    }
  }

  fetchRoles() {
    this.rolesService.getRoles().subscribe((response: Role[]) => {
      this.roles = response;
    });
  }

  fetchUser() {
    this.loading = true;
    this.usersService.getUser(this.data.user.id).subscribe((response: User) => {
      this.loading = false;
      this.fetchedUser = response;
      this.userForm.patchValue({
        username: response.username,
        name: response.name,
        password: response.password,
        email: response.email,
        role: response.role,
        status: response.status,
      });
    },
      error => {
        this.notification.error('Unable to fetch user details')
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getFormControl(field: string) {
    return this.userForm.get(field);
  }

  onSubmit(): void {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      this.loading = true;
      if (this.data.user !== null) {
        const userData = this.userForm.value;
        this.usersService.updateUser(userData, this.data.user).subscribe((response: User) => {
          this.loading = false;
          this.notification.success('User updated successfully');
          this.dialogRef.close({ response: true });
        }, error => {
          this.notification.error('Unable to update the user')
        });
      } else {
        this.usersService.createUser(this.userForm.value).subscribe((response: User) => {
          this.loading = false;
          this.notification.success('User created successfully');
          this.dialogRef.close({ response: true });
        }, error => {
          this.notification.error('Unable to create the user')
        });
      }
    }
  }
}
