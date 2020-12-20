import { Component, HostListener } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Observable } from 'rxjs';

import { User } from './models/user/user';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ScreensizeService } from './services/screensize.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  user; 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private router: Router,
    private screensizeService: ScreensizeService
  ) {

    this.initializeApp();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.screensizeService.onResize(this.platform.width());

      this.auth.getObservable().subscribe((data) => {
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

  onClickLogged(){
    this.router.navigate(['/edit-profile'], {state: {usuario: this.user}});
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event) {
    this.screensizeService.onResize(event.target.innerWidth);
  }
}
