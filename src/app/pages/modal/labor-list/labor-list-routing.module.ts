import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaborListPage } from './labor-list.page';

const routes: Routes = [
  {
    path: '',
    component: LaborListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaborListPageRoutingModule {}
