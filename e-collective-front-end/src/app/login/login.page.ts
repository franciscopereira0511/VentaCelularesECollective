import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  inputUser = '';
  inputPassword = '';

  constructor(private router: Router, private toastCtrl: ToastController) { }

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
    this.router.navigate(['/courses'], {state: {
      user: this.inputUser
    }});
  }

  onClickRegister() {
    this.router.navigate(['/register']);
  }

}
