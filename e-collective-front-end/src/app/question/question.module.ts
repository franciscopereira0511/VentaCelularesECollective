import { FromNowPipe } from './../pipes/from-now.pipe';
import { AnswerComponent } from './answer.component';
import { QuestionComponent } from './question.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [QuestionComponent, AnswerComponent, FromNowPipe],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [QuestionComponent, AnswerComponent, FromNowPipe]
})
export class QuestionModule { }
