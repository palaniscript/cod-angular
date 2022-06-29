import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TriageComponent } from './triage.component';

const routes: Routes = [
  {
    path: '',
    component: TriageComponent,
    data: {
      title: 'Triage'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TriageRoutingModule { }
