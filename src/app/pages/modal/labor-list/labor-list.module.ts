import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaborListPageRoutingModule } from './labor-list-routing.module';

import { LaborListPage } from './labor-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaborListPageRoutingModule
  ],
  declarations: [LaborListPage]
})
export class LaborListPageModule {}
