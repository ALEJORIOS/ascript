import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'write',
    loadComponent: () => import('./write/write.component').then(p => p.WriteComponent)
  },
  {
    path: 'read/:doc',
    loadComponent: () => import('./read/read.component').then(p => p.ReadComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(p => p.HomeComponent)
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }