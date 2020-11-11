import { Injectable } from '@angular/core';


import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

import {Product} from '../../models/product/product'


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: AngularFireList<any>;
  selectedProduct: Product = new Product();

  constructor(private firebase: AngularFireDatabase) { }

  getProducts(){
    return this.productList = this.firebase.list('products');
  }

  insertProduct(product: Product){
    this.productList.push({
      name:product.name,
      model: product.model,
      price: product.price,
      quantity: product.quantity,
      imgUrl: product.imgUrl
    });
  }

  updateProduct(product: Product){
    this.productList.update(product.$id,{
      name:product.name,
      model: product.model,
      price: product.price,
      quantity: product.quantity,
      imgUrl: product.imgUrl
    });
  }

  deleteProduct($id:string){
    this.productList.remove($id)
  }
}
