import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkerLaborCreatePageRoutingModule } from './worker-labor-create-routing.module';

import { WorkerLaborCreatePage } from './worker-labor-create.page';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkerLaborCreatePageRoutingModule,
    IonicSelectableModule
  ],
  declarations: [WorkerLaborCreatePage]
})
export class WorkerLaborCreatePageModule {}
