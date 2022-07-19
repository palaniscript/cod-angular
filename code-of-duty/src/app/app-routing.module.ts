import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './utils/auth.guards';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: SiteLayoutComponent,
    loadChildren: () => import('src/app/dashboard/dashboard.module').then(m => m.DashboardModule),
    data: {
      title: 'Dashboard'
    },
  },
  {
    path: 'users',
    component: SiteLayoutComponent,
    loadChildren: () => import('src/app/users/users.module').then(m => m.UsersModule),
    data: {
      title: 'Users'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'roles',
    component: SiteLayoutComponent,
    loadChildren: () => import('src/app/roles/roles.module').then(m => m.RolesModule),
    data: {
      title: 'Roles'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'rules',
    component: SiteLayoutComponent,
    loadChildren: () => import('src/app/rules/rules.module').then(m => m.RulesModule),
    data: {
      title: 'Rules'
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'sites',
    component: SiteLayoutComponent,
    loadChildren: () => import('src/app/sites/sites.module').then(m => m.SitesModule),
    data: {
      title: 'Sites'
    },
  },
  {
    path: 'triage',
    component: SiteLayoutComponent,
    loadChildren: () => import('src/app/triage/triage.module').then(m => m.TriageModule),
    data: {
      title: 'Triage'
    },
  },
  {
    path: '404',
    component: NotFoundComponent,
    data: {
      title: 'Not Found'
    }
  },
  {
    path: 'access-denied',
    component: AccessDeniedComponent,
    data: {
      title: 'Access Denied'
    },
  },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
