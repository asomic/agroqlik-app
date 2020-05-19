import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkerLaborCreatePage } from './worker-labor-create.page';

const routes: Routes = [
  {
    path: '',
    component: WorkerLaborCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkerLaborCreatePageRoutingModule {}
