import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Observable } from 'rxjs';

import { User } from './models/user/user';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  private user; 
  private admin = "keab1981@gmail.com";
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private router:Router
  ) {

    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.auth.getObservable().subscribe((data) => {
        console.log('Data received', data);
        this.user = data;
      });
    });
  }
  onClickLogOut(){
    this.auth.logout();
    this.auth.setSubject(null);
    this.router.navigate(['/home'])
    .then(() => {
      window.location.reload();
    });
  }
}
