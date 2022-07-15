import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitesRoutingModule } from './sites-routing.module';
import { SitesComponent } from './sites/sites.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'
import { MatIconModule} from '@angular/material/icon';
import { AppMaterialModule } from '../app-material/app-material.module';
import { AddEditSiteComponent } from './add-edit-site/add-edit-site.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SitesComponent,
    AddEditSiteComponent
  ],
  imports: [
    CommonModule,
    SitesRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    AppMaterialModule,
    ReactiveFormsModule
  ]
})
export class SitesModule { }
