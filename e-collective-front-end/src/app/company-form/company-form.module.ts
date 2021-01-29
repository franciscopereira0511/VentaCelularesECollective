import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyFormPageRoutingModule } from './company-form-routing.module';

import { CompanyFormPage } from './company-form.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CompanyFormPage]
})
export class CompanyFormPageModule {}
