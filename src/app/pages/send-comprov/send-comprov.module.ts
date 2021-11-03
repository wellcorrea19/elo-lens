import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendComprovPageRoutingModule } from './send-comprov-routing.module';

import { SendComprovPage } from './send-comprov.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendComprovPageRoutingModule
  ],
  declarations: [SendComprovPage]
})
export class SendComprovPageModule {}
