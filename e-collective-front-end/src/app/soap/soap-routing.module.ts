import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SOAPPage } from './soap.page';

const routes: Routes = [
  {
    path: '',
    component: SOAPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SOAPPageRoutingModule {}
