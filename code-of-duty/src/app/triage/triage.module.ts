import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';
import { TriageRoutingModule } from './triage-routing.module';
import { TriageComponent } from './triage.component';

@NgModule({
  declarations: [
    TriageComponent
  ],
  imports: [
    CommonModule,
    TriageRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ]
})
export class TriageModule { }
