import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkerDayPageRoutingModule } from './worker-day-routing.module';

import { WorkerDayPage } from './worker-day.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkerDayPageRoutingModule
  ],
  declarations: [WorkerDayPage]
})
export class WorkerDayPageModule {}
