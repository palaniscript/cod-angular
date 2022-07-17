import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorMessage, Site } from 'src/app/shared/model';
import { NotificationsService } from 'src/notifications.service';
import { SitesService } from '../sites/sites.service';

@Component({
  selector: 'app-add-edit-site',
  templateUrl: './add-edit-site.component.html',
})
export class AddEditSiteComponent implements OnInit {

  public errors: ErrorMessage[] = [];
  public siteForm: FormGroup;
  public loading = false;

  constructor(
    public readonly dialogRef: MatDialogRef<AddEditSiteComponent>,
    private readonly notification: NotificationsService,
    private readonly sitesService: SitesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.siteForm = this.fb.group({
      siteId: ['', [Validators.required]],
      siteName: ['', [Validators.required]],
      aeId: ['', [Validators.required]],
      cewisId: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
    if (this.data.site !== null) {
      this.fetchSite();
    }
  }

  fetchSite() {
    this.loading = true;
    this.sitesService.getSite(this.data.site.id).subscribe((response: Site) => {
      this.loading = false;
      this.siteForm.patchValue({
        siteId: response.siteId,
        siteName: response.siteName,
        aeId: response.aeId,
        cewisId: response.cewisId,
        status: response.status
      });
    },
      error => {
        this.notification.error('Unable to fetch site details')
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  get site() {
    return this.siteForm.get('site');
  }

  onSubmit(): void {
    this.siteForm.markAllAsTouched();
    if (this.siteForm.valid) {
      this.loading = true;
      if (this.data.site !== null) {
        this.sitesService.updateSite(this.siteForm.value, this.data.site).subscribe((response: Site) => {
          this.loading = false;
          this.notification.success('Site updated successfully');
          this.dialogRef.close({ response: true });
        }, error => {
          this.notification.error('Unable to update the site')
        });
      } else {
        this.sitesService.createSite(this.siteForm.value).subscribe((response: Site) => {
          this.loading = false;
          this.notification.success('Site created successfully');
          this.dialogRef.close({ response: true });
        }, error => {
          this.notification.error('Unable to create the site')
        });
      }
    }
  }
}
