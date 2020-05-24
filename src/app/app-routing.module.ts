import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./pages/auth/forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canLoad: [ AuthGuard ],
  },
  {
    path: 'worker-day/:worker',
    loadChildren: () => import('./pages/worker/worker-day/worker-day.module').then( m => m.WorkerDayPageModule),
    canLoad: [ AuthGuard ],
  },
  {
    path: 'worker-day/:worker/addlabor',
    loadChildren: () => import('./pages/worker/worker-labor-create/worker-labor-create.module').then( m => m.WorkerLaborCreatePageModule),
    canLoad: [ AuthGuard ],
  },
  {
    path: 'worker-find',
    loadChildren: () => import('./pages/worker/worker-find/worker-find.module').then( m => m.WorkerFindPageModule),
    canLoad: [ AuthGuard ],
  },
  {
    path: 'worker-list',
    loadChildren: () => import('./pages/worker/worker-list/worker-list.module').then( m => m.WorkerListPageModule),
    canLoad: [ AuthGuard ],
  },
  {
    path: 'cost-center-show/:costcenter',
    loadChildren: () => import('./pages/cost-center/cost-center-show/cost-center-show.module').then( m => m.CostCenterShowPageModule),
    canLoad: [ AuthGuard ],
  },

  // eliminar
  // {
  //   path: 'worker-labor-create',
  //   loadChildren: () => import('./pages/worker/worker-labor-create/worker-labor-create.module').then( m => m.WorkerLaborCreatePageModule)
  // },
  // {
  //   path: 'worker-labor-edit',
  //   loadChildren: () => import('./pages/worker/worker-labor-edit/worker-labor-edit.module').then( m => m.WorkerLaborEditPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
