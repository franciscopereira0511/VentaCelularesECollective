import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminEmployeesPage } from './admin-employees.page';

const routes: Routes = [
  {
    path: '',
    component: AdminEmployeesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminEmployeesPageRoutingModule {}
