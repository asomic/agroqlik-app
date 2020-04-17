import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkerListPageRoutingModule } from './worker-list-routing.module';

import { WorkerListPage } from './worker-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkerListPageRoutingModule
  ],
  declarations: [WorkerListPage]
})
export class WorkerListPageModule {}
