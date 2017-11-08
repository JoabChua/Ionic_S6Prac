import { AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private authService: AuthService, private loadingCtrl: LoadingController,
              private alertCtrl: AlertController) {
  }

  onSignin(form: NgForm){
    const loading = this.loadingCtrl.create({
      content: 'Sigining you in. . . '
    });
    loading.present();
    this.authService.signin(form.value.email, form.value.password).then(
      data => {
        loading.dismiss();
      }
    ).catch(
      error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'SignIn Failed',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

}
