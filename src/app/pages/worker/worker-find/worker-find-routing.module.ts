import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkerFindPage } from './worker-find.page';

const routes: Routes = [
  {
    path: '',
    component: WorkerFindPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkerFindPageRoutingModule {}
