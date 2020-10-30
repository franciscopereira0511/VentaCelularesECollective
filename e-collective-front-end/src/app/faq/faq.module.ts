import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FAQPageRoutingModule } from './faq-routing.module';

import { FAQPage } from './faq.page';
import { AccordionModule } from '../accordion/accordion.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FAQPageRoutingModule,
    AccordionModule
  ],
  declarations: [FAQPage]
})
export class FAQPageModule {}
