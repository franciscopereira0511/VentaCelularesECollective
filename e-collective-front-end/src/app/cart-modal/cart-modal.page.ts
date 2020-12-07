import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { CarritoService } from '../services/carrito.service';
import { Product } from '../models/product/product';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  carro: Product[] = [];
  @Input() usuario;

  constructor(private carritoServicio: CarritoService, private modalCtr: ModalController,
              private router: Router, private toastCtrl: ToastController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.carro = this.carritoServicio.getCarro();
    let i = 0;
    this.carro.forEach(product => {
      i += product.price;
    });

    // console.log(this.usuario);
  }

  async showToast(msg: string, pColor: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: pColor,
      position: 'top'
    });
    (await toast).present();
  }

  async presentAlertLogin() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Debe iniciar sesión',
      message: 'Es necesario registrarse/iniciar sesión para crear una orden de compras.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Se canceló la operación.');
          }
        }, {
          text: 'Iniciar sesión',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ]
    });


    await alert.present();
  }

  createBuyOrder() {
    if (this.usuario.email) {
      console.log('orden de compra creada');
      this.showToast('Se creó la orden de compra exitosamente.', 'success');
      // Aquí se debe insertar la función que guarda la orden de compra en la base de datos.
    }
    else {
      this.modalCtr.dismiss();
      this.presentAlertLogin();
    }

  }

  decreaseProduct(product){
    this.carritoServicio.decrementarProducto(product);
  }

  increaseProduct(product){
    this.carritoServicio.agregarProducto(product);
  }

  deleteProduct(product){
    this.carritoServicio.eliminarProducto(product);
  }

  getTotal(){
    return this.carro.reduce((i, j) => i + (j.price - (0.01 * j.discount) * j.price) * j.quantity, 0);
  }


close(){
  this.modalCtr.dismiss();
}

}