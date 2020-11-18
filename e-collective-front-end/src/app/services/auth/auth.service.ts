import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage } from '@angular/fire/storage'
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable, Subject } from 'rxjs';
import { finalize, map } from 'rxjs/operators'
import { User } from 'src/app/models/user/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private fooSubject = new Subject<any>();

  private loginID = '';
  private user : User = new User();
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
          this.firestore.collection('users').add(user);
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

  getUser(){
    return this.user;
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

  setUserData(user, uid){
    return this.firestore.collection('users').doc(uid).set({
      name: user.name,
      birthdate: user.birthdate,
      email: user.email,
      imageData: user.profilePhoto
    });
  }


  resetPassword(email){
    return this.auth.auth.sendPasswordResetEmail(email);
  }

}
