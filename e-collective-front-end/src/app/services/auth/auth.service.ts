import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage'
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators'
import { User } from 'src/app/models/user/user';
import { UsersService } from '../users/users.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginID = '';
  private user : User = new User();
  private filePath:any;
  private downloadURL: Observable<string>;

  constructor(private auth: AngularFireAuth, 
              private firestore: AngularFirestore,
              private storage: AngularFireStorage,
              private userService: UsersService) { }


            
  login(email: string, password: string) {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
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
          this.userService.insertUser(user);
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

  getUserData(email){
    return this.firestore.collection<User>('users', ref => ref.where('email', '==', email)).valueChanges({idField: 'id'});
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
