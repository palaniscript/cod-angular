import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rule } from 'src/app/shared/model';
import { environment } from 'src/environments/environment';
import { NotificationsService } from 'src/notifications.service';
import { existingRuleValidator } from '../custom-validators/existing-rule-validator';
import { RulesService } from '../rules.service';

@Component({
  selector: 'app-add-edit-rule',
  templateUrl: './add-edit-rule.component.html',
  styleUrls: ['./add-edit-rule.component.scss'],
})
export class AddEditRuleComponent implements OnInit {
  public ruleForm: FormGroup;
  public loading = false;
  public showEndPoint = false;
  public showMatchingFields = false;
  public systems = [
    { value: 'ae', viewValue: 'Also Energy' },
    { value: 'cewis', viewValue: 'CEWIS' },
  ];
  public checkTypes = [
    { value: 'count', viewValue: 'Has Data' },
    { value: 'data', viewValue: 'Validate Data' },
  ];

  constructor(
    public readonly dialogRef: MatDialogRef<AddEditRuleComponent>,
    private readonly notification: NotificationsService,
    private readonly rulesService: RulesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit() {
    this.ruleForm = this.fb.group({
      title: [
        '',
        [Validators.required],
        [existingRuleValidator(this.rulesService, this.data.rule)],
      ],
      description: ['', [Validators.required]],
      system: ['', [Validators.required]],
      endPoint: ['', [Validators.required]],
      checkType: ['', [Validators.required]],
      source: ['', [Validators.required]],
      response: ['', [Validators.required]],
    });
    if (this.data.rule !== null) {
      this.fetchRule();
    }
  }

  onSystemChange(event) {
    this.showEndPoint = event.value === 'ae' || event.value === 'cewis';
    if (this.ruleForm.value.endPoint === '') {
      if (event.value === 'ae') {
        this.ruleForm.patchValue({ endPoint: environment.aeUrl });
      } else if (event.value === 'cewis') {
        this.ruleForm.patchValue({ endPoint: environment.cewisUrl });
      }
    }
  }

  onCheckTypeChange(event) {
    this.showMatchingFields = event.value === 'data';
    if (event.value === 'data') {
      this.ruleForm.controls.source.setValidators([Validators.required]);
      this.ruleForm.controls.response.setValidators([Validators.required]);
    } else {
      this.ruleForm.controls['source'].clearValidators();
      this.ruleForm.controls['response'].clearValidators();
      this.ruleForm.controls['source'].updateValueAndValidity();
      this.ruleForm.controls['response'].updateValueAndValidity();
    }
    this.ruleForm.updateValueAndValidity();
  }

  fetchRule() {
    this.loading = true;
    this.rulesService.getRule(this.data.rule.id).subscribe(
      (response: Rule) => {
        this.loading = false;
        this.ruleForm.patchValue({
          title: response.title,
          description: response.description,
          system: response.system,
          endPoint: response.endPoint,
          checkType: response.checkType,
          source: response.source,
          response: response.response,
        });
        this.onSystemChange({ value: response.system });
        this.onCheckTypeChange({ value: response.checkType });
      },
      (error) => {
        this.notification.error('Unable to fetch rule details');
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
          this.rulesService
            .updateRule(this.ruleForm.value, this.data.rule)
            .subscribe(
              (response: Rule) => {
                this.loading = false;
                this.notification.success('Rule updated successfully');
                this.dialogRef.close({ response: true });
              },
              (error) => {
                this.notification.error('Unable to update the rule');
              }
            );
        }, 5000);
      } else {
        this.rulesService.createRule(this.ruleForm.value).subscribe(
          (response: Rule) => {
            this.loading = false;
            this.notification.success('Rule created successfully');
            this.dialogRef.close({ response: true });
          },
          (error) => {
            this.notification.error('Unable to create the rule');
          }
        );
      }
    }
  }
}
