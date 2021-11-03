import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendComprovPage } from './send-comprov.page';

const routes: Routes = [
  {
    path: '',
    component: SendComprovPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendComprovPageRoutingModule {}
