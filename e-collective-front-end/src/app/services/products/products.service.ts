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
  promosList: AngularFirestoreCollection<Product>;
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
    console.log(idProduct);
    return this.productList.doc<Product>(idProduct).valueChanges();
  }


  insertProduct(product:Product){
    return this.productList.doc(product.id).set(product);
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

  getPromos():Observable<Product[]>{
    this.productList = this.firestore.collection<Product>('products');
    this.promosList = this.firestore.collection<Product>('products',ref =>{
      return ref.where('discount','>',0)
    })
    return this.promosList.valueChanges({idField: 'id'});
  }


  getQuestions(idProduct):Observable<Question[]>{
    this.questionList = this.firestore.collection<Question>('questions',
    ref=> ref.where('idProduct','==',idProduct));
    return this.questionList.valueChanges({idField: 'id'});
  }

  getQuestion(idQuestion: string): Observable<Question> {
    return this.questionList.doc<Question>(idQuestion).valueChanges();
  }

  insertQuestion(question){
    return this.firestore.collection("questions").add(_.omit(question, ['id']));
  }

  insertAnswer(answer){
    console.log(answer.questionId)
    return this.firestore.collection("questions").doc(answer.questionId).collection("answers").add(_.omit(answer, ['id']));
  }

  updateQuestion(question:Question){
    return this.questionList.doc(question.id).update(_.omit(question, ['id']));
  }

  deleteQuestion(idQuestion: string): any|undefined {
    return this.questionList.doc(idQuestion).delete();
  }

  getPromo(idProduct: string): Observable<Product> {
    console.log(idProduct);
    return this.promosList.doc<Product>(idProduct).valueChanges();
  }

}
