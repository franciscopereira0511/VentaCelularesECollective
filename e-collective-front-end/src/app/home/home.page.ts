import { Component } from '@angular/core';
<<<<<<< HEAD
import { Device } from 'src/models/device.model';
=======
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { CarritoService } from '../services/carrito.service';
>>>>>>> d4ce0b0bb991cd0b26945be245a4141ae245d22a

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private dynamicColor: string;
<<<<<<< HEAD
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

=======
  carro = [];
  productos = [];
  contadorItems :  BehaviorSubject <number>;

  constructor(/*private carritoCtrl: PopoverController*/ private carritoServicio: CarritoService,private modalCtrl: ModalController) {
    this.dynamicColor = 'light';
  }

  ngOnInit(){
    this.productos = this.carritoServicio.getProductos();
    this.carro = this.carritoServicio.getCarro();
    this.contadorItems = this.carritoServicio.getContadorItems();

  }

  agregarEnCarrito(producto){
    this.carritoServicio.agregarProducto(producto);

  }

 async abrirCarrito(){
    let modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.present();
  }
>>>>>>> d4ce0b0bb991cd0b26945be245a4141ae245d22a

}
