import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CarritoService } from '../services/carrito.service';
import { Product } from '../models/product/product'

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  carro: Product[] = [];

  constructor(private carritoServicio: CarritoService, private modalCtr: ModalController) { }

  ngOnInit() {
    this.carro = this.carritoServicio.getCarro();
    let i = 0;
    this.carro.forEach(product => {
      i += product.price;
    });
  }

  decreaseProduct(product){
    this.carritoServicio.decrementarProducto(product);
  }

  increaseProduct(product){
    this.carritoServicio.agregarProducto(product);
  }

  deleteProduct(product){
    this.carritoServicio.eliminarProducto(product)
  }

  getTotal(){
    return this.carro.reduce((i, j) => i + (j.price - (0.01 * j.discount) * j.price) * j.quantity, 0);
  }


close(){
  this.modalCtr.dismiss();
}

}
 