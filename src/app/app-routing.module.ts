import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'worker-day/:worker',
    loadChildren: () => import('./pages/worker/worker-day/worker-day.module').then( m => m.WorkerDayPageModule)
  },
  {
    path: 'worker-find',
    loadChildren: () => import('./pages/worker/worker-find/worker-find.module').then( m => m.WorkerFindPageModule)
  },
  {
    path: 'worker-list',
    loadChildren: () => import('./pages/worker/worker-list/worker-list.module').then( m => m.WorkerListPageModule)
  },
  {
    path: 'cost-center-show/:costCenter',
    loadChildren: () => import('./pages/cost-center/cost-center-show/cost-center-show.module').then( m => m.CostCenterShowPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
