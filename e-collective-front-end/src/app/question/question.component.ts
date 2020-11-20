import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question',
  template: `
  <ng-content select="app-answer"></ng-content>
  `,
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
