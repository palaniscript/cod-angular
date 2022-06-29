import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SitesRoutingModule } from './sites-routing.module';
import { SitesComponent } from './sites.component';

@NgModule({
  declarations: [
    SitesComponent
  ],
  imports: [
    CommonModule,
    SitesRoutingModule
  ]
})
export class SitesModule { }
