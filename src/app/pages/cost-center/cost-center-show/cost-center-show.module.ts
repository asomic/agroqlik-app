import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CostCenterShowPageRoutingModule } from './cost-center-show-routing.module';

import { CostCenterShowPage } from './cost-center-show.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CostCenterShowPageRoutingModule
  ],
  declarations: [CostCenterShowPage]
})
export class CostCenterShowPageModule {}
