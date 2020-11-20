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
  price = 500;
  discountPercent = 20;
  discounted  = this.price - (this.price*(this.discountPercent*0.01));
  imagen = "../../assets/images/Samsung.jpg";
  name = "Samsung XL 21";

  constructor(private productsService: ProductsService) { }

  ngOnInit(){
    this.productsService.getProducts().subscribe(products=>{
      this.productos=products;
    });
  }
}
