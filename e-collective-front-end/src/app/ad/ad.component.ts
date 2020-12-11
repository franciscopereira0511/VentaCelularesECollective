import { Component, Inject, OnInit } from '@angular/core';
import { Product } from '../models/product/product';
import { ProductsService } from '../services/products/products.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss'],
})
export class AdComponent implements OnInit {
  producto: Product;
  productos: Product[] = [];
  randomAd: number;

  name: string;
  imagen: string;
  price: number;
  discount: number;
  discounted: number;
  
  constructor( private productsService: ProductsService, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialog) { }

  newAd(){
    this.productsService.getPromos().subscribe(products=>{
      this.productos=products;

      this.randomAd = Math.floor(Math.random() * this.productos.length);
      this.name = this.productos[this.randomAd].name;
      this.imagen = this.productos[this.randomAd].imgUrl;
      this.price = this.productos[this.randomAd].price;
      this.discount = this.productos[this.randomAd].discount;
      this.discounted = (this.price - (0.01 *this.discount)*this.price);
      
      this.producto = this.productos[this.randomAd];
        });
  }
  
  verDetalles() {
    this.router.navigate(['/product-details'], {state: {producto: this.producto, usuario: this.data}});
    this.dialogRef.closeAll();
  }

  ngOnInit(){  
    this.newAd();
  }
}