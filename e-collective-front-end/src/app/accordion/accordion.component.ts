import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accordion',
  template: `
  <ng-content select="app-accordion-item"></ng-content>
  `,
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
