import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Product } from 'src/app/models/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productList: AngularFirestoreCollection<Product>;
  selectedProduct: Product = new Product();

  constructor( private firestore: AngularFirestore) { }

  getProducts(){
    this.productList = this.firestore.collection<Product>('products');
  }

}
