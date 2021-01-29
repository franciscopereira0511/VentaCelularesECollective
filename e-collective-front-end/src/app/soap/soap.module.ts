import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SOAPPageRoutingModule } from './soap-routing.module';

import { SOAPPage } from './soap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SOAPPageRoutingModule
  ],
  declarations: [SOAPPage]
})
export class SOAPPageModule {}
