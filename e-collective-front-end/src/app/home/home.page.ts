import { ScreensizeService } from './../services/screensize.service';
import { AuthService } from './../services/auth/auth.service';
import { User } from './../models/user/user';
import { Component, OnInit } from '@angular/core';
import { Device } from 'src/models/device.model';
import { AlertController, ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { CarritoService } from '../services/carrito.service';
import { Product } from '../models/product/product';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { tap } from 'rxjs/operators';
import { ProductsService } from '../services/products/products.service';
import { MatDialog } from '@angular/material/dialog';
import { AdComponent } from '../ad/ad.component';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  isDesktop: boolean;
  private dynamicColor: string;
  devices: Device[] = [];

  emailUsuario: string;
  observableUser = new Observable<User>();
  usuario;
  carro = [];
  contadorItems: BehaviorSubject <number>;
  producto: Product;
  productos: Product[] = [];
  items: any = [];
  ofertas = [];

  customOptions: OwlOptions = {
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
		autoplaySpeed: 3000,
    loop: true,
    autoWidth: true,
    center: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: true,
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
    nav: false
  };

  constructor( private carritoServicio: CarritoService,
               private modalCtrl: ModalController,
               private router: Router,
               private productsService: ProductsService,
               private auth: AuthService,
               private route: ActivatedRoute,
               private dialog: MatDialog,
               private scrSize: ScreensizeService,
               private alertCtrl: AlertController
               ) {
                this.showAd();
                this.dynamicColor = 'light';
                this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {

        this.emailUsuario = this.router.getCurrentNavigation().extras.state.email;

        if (firebase.auth().currentUser != null){
          this.observableUser = this.auth.getUserByEmail(this.emailUsuario).pipe(
            tap(user => {
              if (user) {
                this.usuario = user;
                // console.log(user.imageData);
                this.auth.setSubject(user);
                console.log('success');
              } else {
                console.log('nelson');
              }
            }));
            firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        }
      }
    });


                this.scrSize.isDesktopView().subscribe(isDesktop => {
      if (this.isDesktop && !isDesktop) {
        // Reload because our routing is out of place
        window.location.reload();
      }

      this.isDesktop = isDesktop;
    });

  }


  ngOnInit(){
    this.usuario = this.auth.getUser;
    this.carro = this.carritoServicio.getCarro();
    this.contadorItems = this.carritoServicio.getContadorItems();
    this.productsService.getProducts().subscribe(products => {
      this.productos = products;
    });
    this.productsService.getPromos().subscribe(products => {
      this.ofertas = products;
    });
  }

  async presentAlertLogin() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Debe iniciar sesión',
      message: 'Es necesario registrarse/iniciar sesión para ver tu historial de compras.',
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

  onClickHistorialCompras() {
    
    if(this.emailUsuario !== undefined) {
      console.log(this.emailUsuario);
      this.router.navigate(['/order-history']);
    }
    else {
      this.presentAlertLogin();
    }
  }

  showAd(){
    this.dialog.open(AdComponent, {});
  }

  verDetalles(producto: Product) {
    this.router.navigate(['/product-details'], {state: {producto, usuario: this.usuario}});
  }

  agregarEnCarrito(producto){
    this.carritoServicio.agregarProducto(producto);
  }

  async abrirCarrito(){
    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      componentProps: { usuario: this.usuario },
    });
    modal.present();
  }

  onClickLogin() {
    this.router.navigate(['/login']);
  }

  onClickLogged(){
    this.router.navigate(['/edit-profile'], {state: {usuario: this.usuario}});
  }

  onClickRegister(){
    this.router.navigate(['/register']);
  }

  onClickLogOut(){
    this.auth.logout();
    this.auth.setSubject(null);
    this.router.navigate(['/home'])
    .then(() => {
      window.location.reload();
    });
  }

  search(ev: any){
    if (this.items.length == 0) { this.items = Array.from(document.getElementById('lista-productos').children); }
    const query = ev.target.value.toLowerCase();
    requestAnimationFrame(() => {
      this.items.forEach(item => {
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item.style.display = shouldShow ? 'block' : 'none';
      });
    });
  }



}
