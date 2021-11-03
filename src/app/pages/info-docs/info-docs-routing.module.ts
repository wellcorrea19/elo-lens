import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoDocsPage } from './info-docs.page';

const routes: Routes = [
  {
    path: '',
    component: InfoDocsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoDocsPageRoutingModule {}
