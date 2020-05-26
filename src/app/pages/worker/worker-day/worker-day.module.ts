
// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// Ionic
import { IonicModule } from '@ionic/angular';

import { WorkerDayPageRoutingModule } from './worker-day-routing.module';

import { WorkerDayPage } from './worker-day.page';

import { LaborListPageModule } from '../../modal/labor-list/labor-list.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    WorkerDayPageRoutingModule,
    LaborListPageModule
  ],
  declarations: [WorkerDayPage],
})
export class WorkerDayPageModule {}
