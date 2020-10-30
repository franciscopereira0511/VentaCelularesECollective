import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private dynamicColor: string;
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

}
