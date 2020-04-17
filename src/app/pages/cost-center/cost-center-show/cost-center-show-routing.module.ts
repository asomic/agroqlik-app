import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CostCenterShowPage } from './cost-center-show.page';

const routes: Routes = [
  {
    path: '',
    component: CostCenterShowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CostCenterShowPageRoutingModule {}
