import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SendDocsPageRoutingModule } from './send-docs-routing.module';

import { SendDocsPage } from './send-docs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SendDocsPageRoutingModule
  ],
  declarations: [SendDocsPage]
})
export class SendDocsPageModule {}
