import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkerLaborCreatePageRoutingModule } from './worker-labor-create-routing.module';

import { WorkerLaborCreatePage } from './worker-labor-create.page';

import { LaborListPageModule } from '../../modal/labor-list/labor-list.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkerLaborCreatePageRoutingModule,
    LaborListPageModule
  ],
  declarations: [WorkerLaborCreatePage]
})
export class WorkerLaborCreatePageModule {}
