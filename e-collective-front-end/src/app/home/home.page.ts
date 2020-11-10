import { Component, OnInit } from '@angular/core';
import { Device } from 'src/models/device.model';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { CarritoService } from '../services/carrito.service';
import { ProductService } from '../services/product/product.service'
import { Product } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private dynamicColor: string;
  devices: Device[] = [

  ];

  carro = [];
  producto:Product;
  productos: Product[];
  contadorItems: BehaviorSubject <number>;

  constructor( private carritoServicio: CarritoService,private modalCtrl: ModalController,private router: Router, private productService: ProductService) {
    this.dynamicColor = 'light';
  }

  ngOnInit(){
    this.carro = this.carritoServicio.getCarro();
    this.contadorItems = this.carritoServicio.getContadorItems();
    return this.productService.getProducts()
    .snapshotChanges().subscribe(item => {
      this.productos = [];
      item.forEach(element => {
        let x = JSON.parse(JSON.stringify(element.payload));
        x["$id"] = element.key;
        this.productos.push(x as Product);
      });
    });
  }

  agregarEnCarrito(producto){
    this.carritoServicio.agregarProducto(producto);

  }

  addProduct(){
    this.producto =  {$id: 'fre6hh', name: 'Iphone', model: 'Galaxy 6', price: 284900, quantity: 1, imgUrl: '../../assets/images/Iphone.jpg'}
    this.productService.insertProduct(this.producto);
  }
  /*= [
    {id: '34f3rv', name: 'Iphone', model: '9', price: 284000, quantity: 1, imgUrl: '../../assets/images/Iphone.jpg'},
    {$id: 'gtr45d', name: 'Samsung', model: 'Galaxy 4', price: 128000, quantity: 1, imgUrl: '../../assets/images/Samsung.jpg'},
    {$id: 'vre3d2', name: 'Huaweii', model: 'P30', price: 250000, quantity: 1, imgUrl: '../../assets/images/Huaweii.jpg'},
    {$id: 'grtr2d', name: 'Samsung', model: 'a5', price: 194000, quantity: 1, imgUrl: '../../assets/images/Samsung.jpg'},
    {$id: 'gre32e', name: 'Iphone', model: '9', price: 288000, quantity: 1, imgUrl: '../../assets/images/Iphone.jpg'},
    {$id: 'ferr3d', name: 'Iphone', model: '7', price: 235770, quantity: 1, imgUrl: '../../assets/images/Iphone.jpg'},
    {$id: 'f3r3rg', name: 'Huaweii', model: 'P40', price: 345678, quantity: 1, imgUrl: '../../assets/images/Huaweii.jpg'},
    {$id: 'vre34v', name: 'Samsung', model: 'a7', price: 232300, quantity: 1, imgUrl: '../../assets/images/Samsung.jpg'},
    {$id: 'fre6hh', name: 'Iphone', model: 'Galaxy 6', price: 284900, quantity: 1, imgUrl: '../../assets/images/Iphone.jpg'}
  ];*/
  async abrirCarrito(){
    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      componentProps: { productos: this.devices },
      cssClass: 'cart-modal'
    });
    modal.present();
  }

  onClickLogin() {
    this.router.navigate(['/login']);
  }

}
