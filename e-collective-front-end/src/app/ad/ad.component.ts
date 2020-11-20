import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product/product';
import { ProductsService } from '../services/products/products.service';


@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss'],
})
export class AdComponent implements OnInit {

  producto: Product;
  productos = [];
  price = 100000;
  discountPercent = 10;
  discounted  = this.price - (this.price*(this.discountPercent*0.01));
  imagen = "https://firebasestorage.googleapis.com/v0/b/ecollective2.appspot.com/o/products%2FAlcatel-3L-3030_clr_560x700_chrome-3.png?alt=media&token=9d3774d9-1006-432f-9e1b-c6bc1e74f49f";
  name = "Alcatel 1S";

  constructor(private productsService: ProductsService ) { }

  ngOnInit(){
    this.productsService.getPromo("H1234").subscribe(oferta=>{
      this.producto=oferta;
    });

    this.price = this.producto.price;
    this.discountPercent = this.producto.discount;  
    this.discounted  = this.price - (this.price*(this.discountPercent*0.01));
    this.imagen = this.producto.imgUrl;
    
  }
}
