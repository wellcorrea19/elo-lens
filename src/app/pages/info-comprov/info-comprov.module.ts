import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoComprovPageRoutingModule } from './info-comprov-routing.module';

import { InfoComprovPage } from './info-comprov.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoComprovPageRoutingModule
  ],
  declarations: [InfoComprovPage]
})
export class InfoComprovPageModule {}
