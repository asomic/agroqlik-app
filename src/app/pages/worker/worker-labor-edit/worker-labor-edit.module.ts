import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkerLaborEditPageRoutingModule } from './worker-labor-edit-routing.module';

import { WorkerLaborEditPage } from './worker-labor-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkerLaborEditPageRoutingModule
  ],
  declarations: [WorkerLaborEditPage]
})
export class WorkerLaborEditPageModule {}
