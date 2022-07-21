import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rule } from 'src/app/shared/model';
import { environment } from 'src/environments/environment';
import { NotificationsService } from 'src/notifications.service';
import { existingRuleValidator } from '../custom-validators/existing-rule-validator';
import { invalidQueryValidator } from '../custom-validators/invalid-query-validator';
import { RulesService } from '../rules.service';

@Component({
  selector: 'app-add-edit-rule',
  templateUrl: './add-edit-rule.component.html'
})
export class AddEditRuleComponent implements OnInit {
  public ruleForm: FormGroup;
  public loading = false;
  public showEndPoint = false;
  public showSqlOptions = false;
  public showAwsOptions = false;
  public showDataValidationFields = false;
  public showSqlDataValidationFields = false;
  public systems = [
    { value: 'ae', viewValue: 'Also Energy' },
    { value: 'cewis', viewValue: 'CEWIS' },
    { value: 'pg', viewValue: 'Postgres' },
    { value: 'aws', viewValue: 'AWS' },
  ];
  public checkTypes = [
    { value: 'count', viewValue: 'Has Data' },
    { value: 'data', viewValue: 'Validate Data' },
  ];
  public sqlCheckTypes = [
    { value: 'count', viewValue: 'Has Data' },
    { value: 'data', viewValue: 'Validate Data' },
  ];
  public days = [
    { value: 0, viewValue: 'Current Day' },
    { value: -1, viewValue: 'Current Day - 1' },
    { value: -2, viewValue: 'Current Day - 2' },
    { value: -3, viewValue: 'Current Day - 3' },
    { value: -4, viewValue: 'Current Day - 4' },
    { value: -5, viewValue: 'Current Day - 5' },
  ];

  constructor(
    public readonly dialogRef: MatDialogRef<AddEditRuleComponent>,
    private readonly notification: NotificationsService,
    private readonly rulesService: RulesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: FormBuilder
  ) { }

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
      query: ['', [Validators.required, invalidQueryValidator()]],
      sqlCheckType: ['', [Validators.required]],
      sqlSource: ['', [Validators.required]],
      sqlResponse: ['', [Validators.required]],
      s3Bucket: ['', [Validators.required]],
      folderName: ['', [Validators.required]],
      day: [null, [Validators.required]]
    });
    if (this.data.rule !== null) {
      this.fetchRule();
    }
  }

  onSystemChange(event) {
    this.showEndPoint = event.value === 'ae' || event.value === 'cewis';
    if (event.value === 'ae') {
      this.showAwsOptions = false;
      this.clearSqlFieldValidators();
      this.clearAwsFieldValidators();
      this.showSqlOptions = false;
      if (this.data.rule === null) {
        this.ruleForm.patchValue({ endPoint: environment.aeUrl });
      }
    } else if (event.value === 'cewis') {
      this.showAwsOptions = false;
      this.clearSqlFieldValidators();
      this.clearAwsFieldValidators();
      this.showSqlOptions = false;
      if (this.data.rule === null) {
        this.ruleForm.patchValue({ endPoint: environment.cewisUrl });
      }
    } else if (event.value === 'pg') {
      this.ruleForm.patchValue({ endPoint: '' });
      this.clearEndpointFieldValidators();
      this.clearAwsFieldValidators();
      this.showSqlOptions = true;
    } else {
      this.ruleForm.patchValue({ endPoint: '' });
      this.clearEndpointFieldValidators();
      this.clearSqlFieldValidators();
      this.showSqlOptions = false;
      this.showAwsOptions = true;
    }
  }

  private clearEndpointFieldValidators() {
    this.ruleForm.patchValue({ endPoint: '' });
    this.ruleForm.controls['endPoint'].clearValidators();
    this.ruleForm.controls['checkType'].clearValidators();
    this.ruleForm.controls['source'].clearValidators();
    this.ruleForm.controls['response'].clearValidators();
    this.ruleForm.controls['endPoint'].updateValueAndValidity();
    this.ruleForm.controls['checkType'].updateValueAndValidity();
    this.ruleForm.controls['source'].updateValueAndValidity();
    this.ruleForm.controls['response'].updateValueAndValidity();
  }

  private clearSqlFieldValidators() {
    this.ruleForm.controls['query'].clearValidators();
    this.ruleForm.controls['sqlCheckType'].clearValidators();
    this.ruleForm.controls['sqlSource'].clearValidators();
    this.ruleForm.controls['sqlResponse'].clearValidators();
    this.ruleForm.controls['query'].updateValueAndValidity();
    this.ruleForm.controls['sqlCheckType'].updateValueAndValidity();
    this.ruleForm.controls['sqlSource'].updateValueAndValidity();
    this.ruleForm.controls['sqlResponse'].updateValueAndValidity();
  }

  private clearAwsFieldValidators() {
    this.ruleForm.controls['s3Bucket'].clearValidators();
    this.ruleForm.controls['folderName'].clearValidators();
    this.ruleForm.controls['day'].clearValidators();
    this.ruleForm.controls['s3Bucket'].updateValueAndValidity();
    this.ruleForm.controls['folderName'].updateValueAndValidity();
    this.ruleForm.controls['day'].updateValueAndValidity();
  }

  onCheckTypeChange(event) {
    this.showDataValidationFields = event.value === 'data';
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

  onSqlCheckTypeChange(event) {
    this.showSqlDataValidationFields = event.value === 'data';
    if (event.value === 'data') {
      this.ruleForm.controls.sqlSource.setValidators([Validators.required]);
      this.ruleForm.controls.sqlResponse.setValidators([Validators.required]);
    } else {
      this.ruleForm.controls['sqlSource'].clearValidators();
      this.ruleForm.controls['sqlResponse'].clearValidators();
      this.ruleForm.controls['sqlSource'].updateValueAndValidity();
      this.ruleForm.controls['sqlResponse'].updateValueAndValidity();
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
          query: response.query,
          sqlCheckType: response.sqlCheckType,
          sqlSource: response.sqlSource,
          sqlResponse: response.sqlResponse,
          s3Bucket: response.s3Bucket,
          folderName: response.folderName,
          day: response.day,
        });
        this.onSystemChange({ value: response.system });
        this.onCheckTypeChange({ value: response.checkType });
        this.onSqlCheckTypeChange({ value: response.sqlCheckType });
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
