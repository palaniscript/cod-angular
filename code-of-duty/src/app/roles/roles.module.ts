import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressButtonsModule } from 'mat-progress-buttons';
import { AppMaterialModule } from '../app-material/app-material.module';
import { AddEditRoleComponent } from './add-edit-role/add-edit-role.component';
import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles/roles.component';

@NgModule({
  declarations: [
    RolesComponent,
    AddEditRoleComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RolesRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule,
    MatProgressButtonsModule.forRoot(),
  ]
})
export class RolesModule { }
