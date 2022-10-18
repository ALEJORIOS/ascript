import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './extrapages/notfound/notfound.component';

const routes: Routes = [
  {
    path: 'account', 
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages-routing.module').then(m => m.PagesRoutingModule)
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
