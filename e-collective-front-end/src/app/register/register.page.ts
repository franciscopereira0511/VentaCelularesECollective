import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { User } from '../models/user/user';
import { AuthService } from '../services/auth/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {

  userForm: FormGroup;
  profilePicture: File = null;
  previewImage: any = 'assets/avatar.svg';

  constructor(private fb: FormBuilder, private router: Router,
              private toastCtrl: ToastController,
              private authService: AuthService,
              private firebase: AngularFireDatabase) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      nombre: [null, Validators.required],
      fchNacimiento: [null, Validators.required],
      correo: [null, [Validators.required, Validators.email]],
      contrasena: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  async showToast(msg: string, pColor: string) {
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: pColor,
      position: 'top'
    });
    (await toast).present();
  }

  onProfilePictureSelected(event){

    if (event.target.files){
      this.profilePicture = (event.target.files[0] as File);

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };

    }
  }

  onClickLogin() {
    this.router.navigate(['/login']);
  }

  onClickHome() {
    this.router.navigate(['/']);
  }

  onClickCreateUser() {
    if (!this.userForm.valid){
      this.showToast('Favor llenar los campos marcados con asterisco (*).', 'danger');
    }
    else {
      const usuario: User = {
        email: this.userForm.get('correo').value,
        name: this.userForm.get('nombre').value,
        password: this.userForm.get('contrasena').value,
        birthdate: this.userForm.get('fchNacimiento').value,
        imageData: this.profilePicture,
        uid: ''
      };
      this.authService.register(usuario.email,usuario.password)
      .then((res) =>{
        usuario.uid = firebase.auth().currentUser.uid
        this.firebase.list('users').push(usuario);
        this.showToast('Usuario creado exitosamente.', 'success');
        this.router.navigate(['/']);

      }).catch((error) =>{
        this.showToast('El correo ya está asociado a un usuario.', 'danger');
      })

    }

  }

}
