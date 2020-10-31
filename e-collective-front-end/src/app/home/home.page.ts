import { Component } from '@angular/core';
import { Device } from 'src/models/device.model';
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
  devices: Device[] = [

  ];

  carro = [];
  productos = [];
  contadorItems: BehaviorSubject <number>;

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
    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      componentProps: { productos: this.devices },
      cssClass: 'cart-modal'
    });
    modal.present();
  }

}
