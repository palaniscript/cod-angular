import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TriageRoutingModule } from './triage-routing.module';
import { TriageComponent } from './triage.component';

@NgModule({
  declarations: [
    TriageComponent
  ],
  imports: [
    CommonModule,
    TriageRoutingModule
  ]
})
export class TriageModule { }
