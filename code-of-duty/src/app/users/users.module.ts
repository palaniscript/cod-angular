import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [
    UsersComponent,
    AddEditUserComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    UsersRoutingModule,
    AppMaterialModule,
  ]
})
export class UsersModule { }
