import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoDocsPageRoutingModule } from './info-docs-routing.module';

import { InfoDocsPage } from './info-docs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoDocsPageRoutingModule
  ],
  declarations: [InfoDocsPage]
})
export class InfoDocsPageModule {}
