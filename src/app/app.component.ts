import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
// Service
import { AuthService } from './services/auth/auth.service';
// Model
import { Auth } from './models/auth.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  user: any = null;
  auth: Auth = null;
  isAuth: boolean = false;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

    });
    this.authService.fetchUser().subscribe(
      response => {
        this.user = response;
      }
    );
    this.authService.isAuthenticated.subscribe(
      response => {
        this.isAuth = response;
      }
    );
  }

  logout() {
    this.menu.close();
    this.authService.logout();
  }
}
