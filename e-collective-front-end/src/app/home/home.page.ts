import { AuthService } from './../services/auth/auth.service';
import { User } from './../models/user/user';
import { Component, OnInit } from '@angular/core';
import { Device } from 'src/models/device.model';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { CarritoService } from '../services/carrito.service';
import { ProductService } from '../services/product/product.service';
import { Product } from '../models/product/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  private dynamicColor: string;
  devices: Device[] = [

  ];

  emailUsuario: string;
  observableUsuario: Observable<any>;
  usuario: User;
  carro = [];
  producto: Product;
  productos: Product[];
  contadorItems: BehaviorSubject <number>;

  constructor( private carritoServicio: CarritoService,
               private modalCtrl: ModalController,
               private router: Router,
               private productService: ProductService,
               private auth: AuthService,
               private route: ActivatedRoute) {
    this.dynamicColor = 'light';

    // Se recupera por medio del state, el correo que se envió desde register o desde login
    const state = this.router.getCurrentNavigation().extras.state;
    if (state) {
      this.emailUsuario = state.email ? state.email : '';
      console.log(this.emailUsuario);
    }

    this.observableUsuario = this.auth.getUserData(this.emailUsuario);
    this.observableUsuario.subscribe(user => {
      if (user) {
        this.usuario = user;
        console.log(this.usuario);
      }
    });

  }

  ngOnInit(){
    this.carro = this.carritoServicio.getCarro();
    this.contadorItems = this.carritoServicio.getContadorItems();
    return this.productService.getProducts()
    .snapshotChanges().subscribe(item => {
      this.productos = [];
      item.forEach(element => {
        const productJSON = JSON.parse(JSON.stringify(element.payload));
        productJSON.$id = element.key;
        this.productos.push(productJSON as Product);
      });
    });
  }

  agregarEnCarrito(producto){
    this.carritoServicio.agregarProducto(producto);
  }

  addProduct(){
    this.producto =  {$id: 'fre6hh', name: 'Iphone', model: 'Galaxy 6', price: 284900, quantity: 1, imgUrl: '../../assets/images/Iphone.jpg'};
    this.productService.insertProduct(this.producto);
  }

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

  onClickRegister(){
    this.router.navigate(['/register']);
  }
}
