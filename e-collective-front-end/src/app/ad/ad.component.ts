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
  oferta:Product;
  promos: Product[] = [];
  name: string;
  imagen: string;
  price: number;
  discount: number;
  discounted: number;
  
  constructor( private productsService: ProductsService) { }

  ngOnInit(){
    this.searchProduct();
    
    //this.name = this.oferta.name;
    //this.imagen = this.oferta.imgUrl;
    //this.price = this.oferta.price;
    //this.discount = this.oferta.discount;
    //this.discounted = (this.price - (0.01 *this.discount)*this.price);

    this.name = "Celular"
    this.imagen = "https://firebasestorage.googleapis.com/v0/b/ecollective2.appspot.com/o/products%2FAlcatel-3L-3030_clr_560x700_chrome-3.png?alt=media&token=9d3774d9-1006-432f-9e1b-c6bc1e74f49f";
    this.price = 500;
    this.discount = 10;
    this.discounted = (this.price - (0.01 *this.discount)*this.price);

  }

  searchProduct(){
    this.product = this.productsService.getPromo('BBQ10').pipe(
      tap(product => {
        if (product) {
          this.oferta = product;
        } 
      }));
  }

}