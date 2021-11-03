import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendDocsPage } from './send-docs.page';

const routes: Routes = [
  {
    path: '',
    component: SendDocsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendDocsPageRoutingModule {}
