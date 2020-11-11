import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

//import { AngularFireDatabase } from 'angularfire2/database'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private loginID:string="";
  private user =
  {
    name:"",
    birthdate:"",
    email:"",
    id:""
  };

  constructor(private auth: AngularFireAuth, private firestore:AngularFirestore) { }

  login(email: string, password: string) {
    return this.auth.auth.signInWithEmailAndPassword(email, password)
  }

  register(email:string,password:string) {
    return this.auth.auth.createUserWithEmailAndPassword(email, password)
  }

/*
 register(email: string, password: string) {
    return new Promise((resolve,reject) =>{
      this.auth.auth.createUserWithEmailAndPassword(email, password)
    .then(user => resolve(user),
    error => reject(error));
    });
  }
*/
  logout() {
    this.auth.auth.signOut();
  }

  setUser(user){
    this.user = user;
    this.loginID = user.id;
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
    return this.firestore.collection('users',ref=>ref.where('email','==',email)).valueChanges({idField: 'id'});
  }
  
  setUserData(user,uid){
    return this.firestore.collection('users').doc(uid).set({
      name:user.name,
      birthdate:user.birthdate,
      email:user.email
    });
  }

  resetPassword(email){
    return this.auth.auth.sendPasswordResetEmail(email);
  }

}
