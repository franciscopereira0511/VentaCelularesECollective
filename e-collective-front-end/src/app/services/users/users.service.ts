import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { User } from 'src/app/models/user/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: AngularFireList<any>;
  actualUser: User = new User();

  constructor(private firebase: AngularFireDatabase) { }

  getUsers(){
    return this.users = this.firebase.list('users');
  }

  insertUser(user: User){
    this.users.push({
      name:user.name,
      email: user.email,
      birthdate: user.birthdate,
      uid: user.uid,
      imageData: user.imageData
    });
  }

  updateUser(user: User){
    this.users.update(user.email,{
      name:user.name,
      email: user.email,
      birthdate: user.birthdate,
      uid: user.uid,
      imageData: user.imageData
    });
  }

  deleteUser(email:string){
    this.users.remove(email)
  }
}
