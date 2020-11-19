import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminEmployeesPageRoutingModule } from './admin-employees-routing.module';

import { AdminEmployeesPage } from './admin-employees.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminEmployeesPageRoutingModule
  ],
  declarations: [AdminEmployeesPage]
})
export class AdminEmployeesPageModule {}
