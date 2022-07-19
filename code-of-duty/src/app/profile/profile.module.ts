import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from '../app-material/app-material.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    AppMaterialModule
  ]
})
export class ProfileModule { }
