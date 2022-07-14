import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  {
    path: 'dashboard',
    component: SiteLayoutComponent,
    loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {
      title: 'Dashboard'
    },
    // canActivate: [AuthGuardService]
  },
  {
    path: 'users',
    component: SiteLayoutComponent,
    loadChildren: () => import('src/app/users/users.module').then(m => m.UsersModule),
    data: {
      title: 'Users'
    },
    // canActivate: [AuthGuardService]
  },
  {
    path: 'roles',
    component: SiteLayoutComponent,
    loadChildren: () => import('src/app/roles/roles.module').then(m => m.RolesModule),
    data: {
      title: 'Roles'
    },
    // canActivate: [AuthGuardService]
  },
  {
    path: 'rules',
    component: SiteLayoutComponent,
    loadChildren: () => import('src/app/rules/rules.module').then(m => m.RulesModule),
    data: {
      title: 'Rules'
    },
    // canActivate: [AuthGuardService]
  },
  {
    path: 'sites',
    component: SiteLayoutComponent,
    loadChildren: () => import('src/app/sites/sites.module').then(m => m.SitesModule),
    data: {
      title: 'Sites'
    },
    // canActivate: [AuthGuardService]
  },
  {
    path: 'triage',
    component: SiteLayoutComponent,
    loadChildren: () => import('src/app/triage/triage.module').then(m => m.TriageModule),
    data: {
      title: 'Triage'
    },
    // canActivate: [AuthGuardService]
  },
 
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
