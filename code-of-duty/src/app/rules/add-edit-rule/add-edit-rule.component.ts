import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditRoleComponent } from 'src/app/roles/add-edit-role/add-edit-role.component';
import { RolesService } from 'src/app/roles/roles/roles.service';
import { Role } from 'src/app/shared/model';
import { NotificationsService } from 'src/notifications.service';

@Component({
  selector: 'app-add-edit-rule',
  templateUrl: './add-edit-rule.component.html',
  styleUrls: ['./add-edit-rule.component.scss']
})
export class AddEditRuleComponent implements OnInit {

  public ruleForm: FormGroup;
  public loading = false;
  public showEndPoint = false;
  public showMatchingFields = false;
  public systems = [
    { value: 'ae', viewValue: 'Also Energy' },
    { value: 'cewis', viewValue: 'CEWIS' }
  ];
  public checkTypes = [
    { value: 'match', viewValue: 'Match Field' },
    { value: 'count', viewValue: 'Count should not be empty' }
  ];

  constructor(
    public readonly dialogRef: MatDialogRef<AddEditRoleComponent>,
    private readonly notification: NotificationsService,
    private readonly rolesService: RolesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.ruleForm = this.fb.group({
      title: ['', [Validators.required],
        // [existingRoleValidator(this.rolesService, this.data.role)]
      ],
      description: ['', [Validators.required]],
      system: ['', [Validators.required]],
      endpoint: ['', [Validators.required]],
      checkType: ['', [Validators.required]],
      source: ['', [Validators.required]],
      response: ['', [Validators.required]],
      count: ['', [Validators.required]]
    });
    if (this.data.rule !== null) {
      this.fetchRole();
    }
  }

  onSystemChange(event) {
    this.showEndPoint = event.value === 'ae' || event.value === 'cewis';
  }

  onCheckTypeChange(event) {
    this.showMatchingFields = event.value === 'match';
  }

  fetchRole() {
    this.loading = true;
    this.rolesService.getRole(this.data.rule.id).subscribe((response: Role) => {
      this.loading = false;
      this.ruleForm.patchValue({
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

  getFormControl(field: string) {
    return this.ruleForm.get(field);
  }

  onSubmit(): void {
    this.ruleForm.markAllAsTouched();
    if (this.ruleForm.valid) {
      this.loading = true;
      if (this.data.rule !== null) {
        setTimeout(() => {
          this.rolesService.updateRole(this.ruleForm.value, this.data.rule).subscribe((response: Role) => {
            this.loading = false;
            this.notification.success('Role updated successfully');
            this.dialogRef.close({ response: true });
          }, error => {
            this.notification.error('Unable to update the role')
          });
        }, 5000);
      } else {
        this.rolesService.createRole(this.ruleForm.value).subscribe((response: Role) => {
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
