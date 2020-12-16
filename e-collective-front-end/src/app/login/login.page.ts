import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  inputUser = '';
  inputPassword = '';

  constructor(private router: Router, private toastCtrl: ToastController, private authService: AuthService) { }

  ngOnInit() {

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

  onClickLogin() {

    const usuario = {
      email: this.inputUser,
      password: this.inputPassword
    };

    const navigationExtras: NavigationExtras = {
      state: {
        email: this.inputUser
      }
    };


    this.authService.login(usuario.email, usuario.password).then((res) => {
      this.authService.getUserData(usuario.email).subscribe(data => {
        this.authService.setUser(data[0]);

        this.inputUser = '';
        this.inputPassword = '';

        this.showToast('¡Bienvenido!', 'success');

        this.router.navigate(['home'], navigationExtras);


      });


    }).catch((error) => {
      this.showToast('Verifique sus credenciales.', 'danger');
    });
  }

  onClickRegister() {
    this.router.navigate(['/register']);
  }

}
