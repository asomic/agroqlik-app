import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkerLaborEditPage } from './worker-labor-edit.page';

const routes: Routes = [
  {
    path: '',
    component: WorkerLaborEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkerLaborEditPageRoutingModule {}
