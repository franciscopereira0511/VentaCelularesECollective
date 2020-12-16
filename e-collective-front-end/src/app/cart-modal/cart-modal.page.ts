import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { CarritoService } from '../services/carrito.service';
import { Product } from '../models/product/product';
import { auth } from 'firebase';
import { ProductsService } from '../services/products/products.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  carro: Product[] = [];
  orderId;
  @Input() usuario;

  constructor(private carritoServicio: CarritoService, private modalCtr: ModalController, private productService: ProductsService,
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

  formatDate(date) {
    if (date !== undefined && date !== '') {
      const myDate = new Date(date);
      const month = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'][myDate.getMonth()];
      const str = myDate.getDate() + ' ' + month + ' ' + myDate.getFullYear();
      return str;
    }
    return '';
  }

  // Obtiene el día actual con formato deseado
  getFechaAsignado() {
    const date = new Date();
    const formattedDate = this.formatDate(date);

    return formattedDate;
  }

  createBuyOrder() {
    if (this.usuario.email) {

      let total = 0;
      const productos = [];
      this.carro.forEach(p => {
        total += p.quantity * (p.price - (0.01 * p.discount) * p.price);
        productos.push(p);
      });

      const date = Date.now().toString();

      const orden = {
        id: date,
        persona: this.usuario.name,
        email: this.usuario.email,
        fecha: this.getFechaAsignado(),
        total,
        productos
      };

      this.productService.insertOrder(orden);

      // Aquí se debe insertar la función que guarda la orden de compra en la base de datos.
      this.carritoServicio.vaciarCarrito();
      this.modalCtr.dismiss();
      this.showToast('Se creó la orden de compra exitosamente.', 'success');
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
