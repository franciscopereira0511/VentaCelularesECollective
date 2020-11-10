import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarritoService } from '../services/carrito.service';
import { Product } from '../models/product'

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  carro: Product[] = [];

  constructor(private carritoServicio: CarritoService, private modalCtr:ModalController) { }

  ngOnInit() {
    this.carro = this.carritoServicio.getCarro();
  }

  decrementarProducto(product){
    this.carritoServicio.decrementarProducto(product);
  }

  incrementarProducto(product){
    this.carritoServicio.agregarProducto(product);
  }

  removerItem(product){
    this.carritoServicio.eliminarProducto(product)
  }

  obtenerTotal(){
    return this.carro.reduce((i,j) => i+ j.price *j.quantity,0);
  }


close(){
  this.modalCtr.dismiss();
}

}
