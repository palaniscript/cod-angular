import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';
import { RulesRoutingModule } from './rules-routing.module';
import { RulesComponent } from './rules/rules.component';
import { AddEditRuleComponent } from './add-edit-rule/add-edit-rule.component';

@NgModule({
  declarations: [
    RulesComponent,
    AddEditRuleComponent
  ],
  imports: [
    CommonModule,
    RulesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppMaterialModule
  ]
})
export class RulesModule { }
