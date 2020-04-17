import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkerFindPageRoutingModule } from './worker-find-routing.module';

import { WorkerFindPage } from './worker-find.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkerFindPageRoutingModule
  ],
  declarations: [WorkerFindPage]
})
export class WorkerFindPageModule {}
