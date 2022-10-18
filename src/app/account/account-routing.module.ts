import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(p => p.RegisterComponent)
  },
  {
    path: 'forgot',
    loadComponent: () => import('./forgot/forgot.component').then(p => p.ForgotComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(p => p.LoginComponent)
  },
  {
    path: '',
    redirectTo: '/account/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
