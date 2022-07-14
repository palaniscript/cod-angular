import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RulesComponent } from './rules/rules.component';

const routes: Routes = [
  {
    path: '',
    component: RulesComponent,
    data: {
      title: 'Rules'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RulesRoutingModule { }
