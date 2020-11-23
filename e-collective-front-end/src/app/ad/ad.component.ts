import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product/product';
import { ProductsService } from '../services/products/products.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss'],
})
export class AdComponent implements OnInit {

  product:Observable<Product> = new Observable<Product>();
  producto: Product;
  productos: Product[] = [];
  randomAd: number;

  name: string;
  imagen: string;
  price: number;
  discount: number;
  discounted: number;
  
  constructor( private productsService: ProductsService) { }

  newAd(){
    this.productsService.getPromos().subscribe(products=>{
      this.productos=products;

      this.randomAd = Math.floor(Math.random() * this.productos.length);
      this.name = this.productos[this.randomAd].name;
      this.imagen = this.productos[this.randomAd].imgUrl;
      this.price = this.productos[this.randomAd].price;
      this.discount = this.productos[this.randomAd].discount;
      this.discounted = (this.price - (0.01 *this.discount)*this.price);
      
        });
  }

  ngOnInit(){  
    this.newAd();
  }
}