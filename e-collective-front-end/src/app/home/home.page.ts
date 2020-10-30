import { Component } from '@angular/core';
import { Device } from 'src/models/device.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private dynamicColor: string;
  devices: Device[] = [
    {name: 'Iphone', model: '9', price: 284000, photoURL: ''},
    {name: 'Samsung', model: 'Galaxy 4', price: 128000, photoURL: ''},
    {name: 'Huaweii', model: 'P30', price: 250000, photoURL: ''},
    {name: 'Samsung', model: 'a5', price: 194000, photoURL: ''},
    {name: 'Iphone', model: '9', price: 288000, photoURL: ''},
    {name: 'Iphone', model: '7', price: 235770, photoURL: ''},
    {name: 'Huaweii', model: 'P40', price: 345678, photoURL: ''},
    {name: 'Samsung', model: 'a7', price: 232300, photoURL: ''},
    {name: 'Iphone', model: 'Galaxy 6', price: 284900, photoURL: ''}
  ];


  constructor() {
    this.dynamicColor = 'light';
  }


}
