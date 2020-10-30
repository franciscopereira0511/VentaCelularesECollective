import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarritoService, Producto } from '../services/carrito.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  carro: Producto[] = [];

  constructor(private carritoServicio: CarritoService, private modalCtr:ModalController) { }

  ngOnInit() {
    this.carro = this.carritoServicio.getCarro();
  }

  decrementarProducto(producto){
    this.carritoServicio.decrementarProducto(producto);
  }

  incrementarProducto(product){
    this.carritoServicio.agregarProducto(product);
  }

  removerItem(product){
    this.carritoServicio.eliminarProducto(product)
  }

  obtenerTotal(){
    return this.carro.reduce((i,j) => i+ j.precio *j.cantidad,0);
  }


close(){
  this.modalCtr.dismiss();
}

}
