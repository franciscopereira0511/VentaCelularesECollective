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
    {name: 'Iphone', model: '9', price: 284.000, photoURL: '../../assets/images/Iphone.jpg'},
    {name: 'Samsung', model: 'Galaxy 4', price: 128.000, photoURL: '../../assets/images/Samsung.jpg'},
    {name: 'Huaweii', model: 'P30', price: 250.000, photoURL: '../../assets/images/Huaweii.jpg'},
    {name: 'Samsung', model: 'a5', price: 194.000, photoURL: '../../assets/images/Samsung.jpg'},
    {name: 'Iphone', model: '9', price: 288.000, photoURL: '../../assets/images/Iphone.jpg'},
    {name: 'Iphone', model: '7', price: 235.770, photoURL: '../../assets/images/Iphone.jpg'},
    {name: 'Huaweii', model: 'P40', price: 345.678, photoURL: '../../assets/images/Huaweii.jpg'},
    {name: 'Samsung', model: 'a7', price: 232.300, photoURL: '../../assets/images/Samsung.jpg'},
    {name: 'Iphone', model: 'Galaxy 6', price: 284.900, photoURL: '../../assets/images/Iphone.jpg'}
  ];


  constructor() {
    this.dynamicColor = 'light';
  }


}
