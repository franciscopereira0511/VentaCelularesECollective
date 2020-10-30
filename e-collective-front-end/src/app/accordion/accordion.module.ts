import { IonicModule } from '@ionic/angular';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import { AccordionComponent } from './accordion.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [AccordionComponent, AccordionItemComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [AccordionComponent, AccordionItemComponent]
})
export class AccordionModule { }
