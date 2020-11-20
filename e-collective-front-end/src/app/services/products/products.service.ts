import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators'
import { Product } from 'src/app/models/product/product';
import { Promos } from 'src/app/models/promos/promos';
import * as _ from 'lodash';
import { Question } from 'src/app/models/question/question';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productList: AngularFirestoreCollection<Product>;
  promosList: AngularFirestoreCollection<Promos>;
  questionList: AngularFirestoreCollection<Question>;

  selectedProduct: Product = new Product();
  private filePath:any;
  private downloadURL: Observable<string>;

  constructor( private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  getProducts():Observable<Product[]>{
    this.productList = this.firestore.collection<Product>('products');
    return this.productList.valueChanges({idField: 'id'});
  }

  getProduct(idProduct: string): Observable<Product> {
    return this.productList.doc<Product>(idProduct).valueChanges();
  }

  insertProduct(product:Product){
    return this.productList.doc(product.id).set(_.omit(product, ['id']));
  }

  updateProduct(product:Product){
    return this.productList.doc(product.id).update(_.omit(product, ['id']));
  }

  deleteProduct(idProduct: string): any|undefined {
    return this.productList.doc(idProduct).delete();
  }

  uploadImage(product:Product,image:File){
    this.filePath = `products/${image.name}`;

    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath,image);

    task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe(urlImage =>{
          this.downloadURL = urlImage;
          console.log('IMG_URL: ',urlImage);
          product.imgUrl = this.downloadURL;
          console.log(product);
          this.insertProduct(product);
        })
      })
    ).subscribe();
  }

  getPromos():Observable<Promos[]>{
    this.promosList = this.firestore.collection<Promos>('promos');
    return this.promosList.valueChanges({idField: 'id'});
  }

  getPromo(idPromo: string): Observable<Promos> {
    return this.promosList.doc<Promos>(idPromo).valueChanges();
  }

  insertPromos(promo:Promos){
    return this.promosList.doc(promo.id).set(_.omit(promo, ['id']));
  }

  updatePromos(promo:Promos){
    return this.promosList.doc(promo.id).update(_.omit(promo, ['id']));
  }

  deletePromos(idPromos: string): any|undefined {
    return this.promosList.doc(idPromos).delete();
  }



  getQuestions():Observable<Question[]>{
    this.questionList = this.firestore.collection<Question>('Question');
    return this.questionList.valueChanges({idField: 'id'});
  }

  getQuestion(idQuestion: string): Observable<Question> {
    return this.questionList.doc<Question>(idQuestion).valueChanges();
  }

  insertQuestion(question:Question){
    return this.questionList.doc(question.id).set(_.omit(question, ['id']));
  }

  updateQuestion(question:Question){
    return this.questionList.doc(question.id).update(_.omit(question, ['id']));
  }

  deleteQuestion(idQuestion: string): any|undefined {
    return this.questionList.doc(idQuestion).delete();
  }

}
