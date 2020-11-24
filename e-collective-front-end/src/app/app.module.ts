import { ContactService } from './services/contact.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CartModalPageModule } from './cart-modal/cart-modal.module';
import { CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


// firebase
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule}  from 'angularfire2/database';
import { environment }  from '../environments/environment'
import { AngularFireStorageModule } from '@angular/fire/storage'
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

//Services
import {ProductsService} from './services/products/products.service';


//Materials
import { MatDialogModule} from '@angular/material/dialog';
import {MatCardModule } from '@angular/material/card';
 
//Carrusel
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AdComponent } from './ad/ad.component';

@NgModule({
  declarations: [AppComponent,AdComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    AngularFireStorageModule,
    IonicModule.forRoot(),
    AppRoutingModule, 
    BrowserAnimationsModule, 
    CartModalPageModule,
    AppRoutingModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    CommonModule,
    MatDialogModule,
    MatCardModule,
    CarouselModule, HttpClientModule,],
  providers: [
    ContactService,
    AngularFireAuth,
    HttpClientModule,
    AngularFirestore,
    ProductsService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
