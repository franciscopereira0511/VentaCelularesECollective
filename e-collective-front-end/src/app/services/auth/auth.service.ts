import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs';
import { finalize, map } from 'rxjs/operators'
import { User } from 'src/app/models/user/user';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private fooSubject = new Subject<any>();
  usersList: AngularFirestoreCollection<User>;;
  private loginID = '';
  private user;
  private filePath:any;
  private downloadURL: Observable<string>;

  constructor(private auth: AngularFireAuth, 
              private firestore : AngularFirestore,
              private storage: AngularFireStorage) { }


            
  login(email: string, password: string) {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  setSubject(data){
    this.fooSubject.next(data);
  }
  getObservable(): Subject<any> {
    return this.fooSubject;
}

  register(email: string, password: string) {
    return this.auth.auth.createUserWithEmailAndPassword(email, password);
  }

  uploadImage(user:User,image:File){
    this.filePath = `users/${image.name}`;

    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath,image);

    task.snapshotChanges()
    .pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe(urlImage =>{
          this.downloadURL = urlImage;
          console.log('IMG_URL: ',urlImage);
          user.imageData = this.downloadURL;
          console.log(user);
          this.firestore.collection('users').doc(user.email).set(user);
          this.setUser(user);
        })
      })
    ).subscribe();
  }

  logout() {
    this.auth.auth.signOut();
  }

  setUser(user){
    this.user = user;
    this.loginID = user.email;
  }

  getUsername() {
    if(this.user){
      return this.user.email;
    } else {
      return null;
    }
  }

  getUser(){
    if(this.user){
      return this.user
    } else {
      return null;
    }
  }

  getUsers():Observable<User[]>{
    this.usersList = this.firestore.collection<User>('users');
    return this.usersList.valueChanges({idField: 'id'});
  }

  setLogin(id){
    this.loginID = id;
  }

  getLogin(){
    return this.loginID; 
  }

  getUserByEmail(email: string): Observable<User> {
    return this.firestore.collection<User>('users', ref => ref.where('email','==', email))
      .snapshotChanges()
      .pipe(map(users => {
        const user = users[0];
        if (user) {
          const data = user.payload.doc.data() as User;
          const id = user.payload.doc.id;
          return data;
        }
        else {
          return null;
        }
      }));
  }

  getUserData(email){
    return this.firestore.collection<User>('users',ref=>ref.where('email','==',email)).valueChanges({idField: 'id'});
  }

  getEmployees(){
    var employees = this.firestore.collection<User>('users',ref =>{
      return ref.where('rol','>',1)
    })
    return employees.valueChanges({idField: 'id'});
  }

  deleteEmployee(user){
    user.rol  = 1;
    return this.firestore.collection('users').doc(user.email).set(_.omit(user, ['email']));
  }

  addEmployee(user){
    user.rol = 3;
    return this.firestore.collection('users').doc(user.email).set(user);
  }

  resetPassword(email){
    return this.auth.auth.sendPasswordResetEmail(email);
  }

}
