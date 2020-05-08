import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModel, NgForm } from '@angular/forms';
//ionic
import { LoadingController, AlertController, ModalController } from '@ionic/angular';

//capacitor
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;

//services
import { AuthService } from '../../../services/auth/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    public modalController: ModalController
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){

    this.loadingCtrl.create({keyboardClose: true,message: 'Validando credenciales...'}).then(
      loading => {
        loading.present();
        const email = form.value.email;
        const password = form.value.password;
        let authSubscription = this.authService.authenticate(email,password).subscribe(authModel => {
          if(authModel.token){
            loading.dismiss();
            this.router.navigateByUrl('dashboard');
          } else {
            console.log('error auth.token');
          }
          authSubscription.unsubscribe();
        },
          err => {
            console.log(err);

            loading.dismiss();
            authSubscription.unsubscribe();
            this.authAlert(err.error.error,err.error.message);
        })
      }
    );
  }

  async authAlert(header:string, message:string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
