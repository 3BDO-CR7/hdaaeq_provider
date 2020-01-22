import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, LoadingController, ToastController, AlertController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiProvider} from "../../service/api/api";

@IonicPage()
@Component({
  selector: 'page-new-password',
  templateUrl: 'new-password.html',
})
export class NewPasswordPage {

  validationCode: FormGroup;

  constructor(
    public navCtrl        : NavController, 
    public navParams      : NavParams,
    public platform       : Platform,
    public translate      : TranslateService,
    public modalCtrl      : ModalController,
    public loadingCtrl    : LoadingController,
    public formBuilder    : FormBuilder,
    public api            : ApiProvider,
    public toastCtrl      : ToastController,
    public alertCtrl      : AlertController) {

      this.validationCode             =      this.formBuilder.group({
        code                          :      ['', Validators.required],
        password                      :      ['', Validators.compose([Validators.minLength(10),Validators.required])],
        confirmPassword               :      ['', Validators.required],
      }, 
      {
        validator: this.matchingPasswords('password', 'confirmPassword')
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewPasswordPage');
  }

  goHome(){
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });
    loading.present();
    loading.dismissAll()
    this.api.newPassword(this.validationCode.value).subscribe(
      response => {
        var message     = (this.translate.currentLang == 'en') ? '<img src="assets/imgs/block-user.png" class="img_alert animated shake"> Sorry This User Has Been Warned'   : '<img src="assets/imgs/block-user.png" class="img_alert animated shake"> عذراََ لقد تم حذر هذا المستخدم';
        var Done        = (this.translate.currentLang == 'en') ? 'Go To The Register'                : 'الذهاب إلى التسجيل';
      const toast = this.toastCtrl.create({
        message: response.massage,
        duration: 3000
      });
      toast.present();
      if (response.key == "1") {
        localStorage.setItem('hdaaeq_provider_Data', JSON.stringify(response.password));
        this.navCtrl.push("HomePage");
      }else if (response.key == "3") {
        const confirm = this.alertCtrl.create({
          message: message,
          buttons: [
            {
              text: Done,
              cssClass: 'BtnCss',
              handler: () => {
                this.navCtrl.push("LoginPage");
              }
            },
          ]
        });
        confirm.present();
      }
      },
      error => {
        loading.dismissAll();
      },()=>{
        loading.dismissAll();
      }
      );

  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

}
