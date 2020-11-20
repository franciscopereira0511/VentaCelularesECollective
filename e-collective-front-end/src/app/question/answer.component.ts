import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { User } from '../models/user/user';
import { Answer, Question } from './question.model';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
  animations: [
    trigger('smoothCollapse', [
      state('initial', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0',
        visibility: 'hidden'
      })),
      state('final', style({
        overflow: 'hidden'
      })),
      transition('initial<=>final', animate('250ms'))
    ]),
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)'})),
      state('rotated', style({ transform: 'rotate(180deg)'})),
      transition('default<=>rotated', animate('250ms'))
    ])
  ]
})
export class AnswerComponent implements OnInit {
  @Input() question: string;
  @Input() textoDerecha: string;

  @Input() user: User;
  @Input() time: number;



  showBody = false;

  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.showBody = !this.showBody;
  }



}
