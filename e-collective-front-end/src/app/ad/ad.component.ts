import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product/product';
import { ProductService } from '../services/product/product.service';


@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss'],
})
export class AdComponent implements OnInit {

  producto: Product;
  productos = [];
  price = 500;
  discounted  = this.price/2;
  imagen = "../../assets/images/Samsung.jpg";
  name = "Samsung XL 21";

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productos = [];
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
}
