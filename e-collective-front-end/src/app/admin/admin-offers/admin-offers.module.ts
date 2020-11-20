import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminOffersPageRoutingModule } from './admin-offers-routing.module';

import { AdminOffersPage } from './admin-offers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdminOffersPageRoutingModule
  ],
  declarations: [AdminOffersPage]
})
export class AdminOffersPageModule {}
