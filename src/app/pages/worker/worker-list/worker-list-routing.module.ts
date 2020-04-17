import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkerListPage } from './worker-list.page';

const routes: Routes = [
  {
    path: '',
    component: WorkerListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkerListPageRoutingModule {}
