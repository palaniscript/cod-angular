import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorMessage, Role } from 'src/app/shared/model';
import { NotificationsService } from 'src/notifications.service';
import { existingRoleValidator } from '../custom-validators/existing-role-validator';
import { RolesService } from '../roles/roles.service';

@Component({
  selector: 'app-add-edit-role',
  templateUrl: './add-edit-role.component.html',
})
export class AddEditRoleComponent implements OnInit {

  public errors: ErrorMessage[] = [];
  public roleForm: FormGroup;
  public loading = false;

  constructor(
    public readonly dialogRef: MatDialogRef<AddEditRoleComponent>,
    private readonly notification: NotificationsService,
    private readonly rolesService: RolesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.roleForm = this.fb.group({
      role: ['', [Validators.required], [existingRoleValidator(this.rolesService, this.data.role)]],
      description: ['']
    });
    if (this.data.role !== null) {
      this.fetchRole();
    }
  }

  fetchRole() {
    this.loading = true;
    this.rolesService.getRole(this.data.role.id).subscribe((response: Role) => {
      this.loading = false;
      this.roleForm.patchValue({
        role: response.role,
        description: response.description
      });
    },
      error => {
        this.notification.error('Unable to fetch role details')
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get role() {
    return this.roleForm.get('role');
  }

  onSubmit(): void {
    this.roleForm.markAllAsTouched();
    if (this.roleForm.valid) {
      this.loading = true;
      if (this.data.role !== null) {
        setTimeout(() => {
          this.rolesService.updateRole(this.roleForm.value, this.data.role).subscribe((response: Role) => {
            this.loading = false;
            this.notification.success('Role updated successfully');
            this.dialogRef.close({ response: true });
          }, error => {
            this.notification.error('Unable to update the role')
          });
        }, 5000);
      } else {
        this.rolesService.createRole(this.roleForm.value).subscribe((response: Role) => {
          this.loading = false;
          this.notification.success('Role created successfully');
          this.dialogRef.close({ response: true });
        }, error => {
          this.notification.error('Unable to create the role')
        });
      }
    }
  }
}
