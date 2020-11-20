import { AuthService } from './../services/auth/auth.service';
import { User } from './../models/user/user';
import { Component, OnInit } from '@angular/core';
import { Device } from 'src/models/device.model';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { CarritoService } from '../services/carrito.service';
import { ProductService } from '../services/product/product.service';
import { Product } from '../models/product/product';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AdComponent } from '../ad/ad.component'
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  private dynamicColor: string;
  devices: Device[] = [];

  emailUsuario: string;
  observableUser = new Observable<User>();
  usuario: User = new User();
  carro = [];
  producto: Product;
  productos: Product[] = [];
  contadorItems: BehaviorSubject <number>;

  constructor( private carritoServicio: CarritoService,
               private modalCtrl: ModalController,
               private router: Router,
               private productService: ProductService,
               private auth: AuthService,             
               private route: ActivatedRoute,
               private dialog: MatDialog,
               ) {
    this.dynamicColor = 'light';
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {

        this.emailUsuario = this.router.getCurrentNavigation().extras.state.email;
        console.log(this.emailUsuario);

        if (firebase.auth().currentUser != null){
          this.observableUser = this.auth.getUserByEmail(this.emailUsuario).pipe(
            tap(user => {
              console.log("aaah perro");
              if (user) {
                console.log(user.imageData);
                this.auth.setSubject(user);
                console.log('success');
              } else {
                console.log('nelson');
              }
            }));
        }
      }
    });

  }


  ngOnInit(){
    let x = this.dialog.open(AdComponent,{});
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
  
   customOptions: OwlOptions = {
    loop: true,
    autoWidth: true,
    center:true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      1: {
        items: 1
      },
      2: {
        items: 2
      },
      3: {
        items: 3
      },
    },
    nav: true
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
