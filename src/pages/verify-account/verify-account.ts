import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, ToastController, AlertController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiProvider} from "../../service/api/api";

@IonicPage()
@Component({
  selector: 'page-verify-account',
  templateUrl: 'verify-account.html',
})
export class VerifyAccountPage {

  user: any;

  private verify     :      FormGroup  = this.formBuilder.group({
    code             :      ['', Validators.required],
    user_id          :      ['', Validators.required],
    lang             :      [],
  });

  constructor(
    public navCtrl          : NavController,
    public navParams        : NavParams,
    public translate        : TranslateService,
    public loadingCtrl      : LoadingController,
    public formBuilder      : FormBuilder,
    public api              : ApiProvider,
    public toastCtrl        : ToastController,
    public platform         : Platform,
    public alertCtrl        : AlertController) {
  }

  ionViewWillEnter(){
    this.user = JSON.parse(localStorage.getItem('hdaaeq_register_provider_Data'));
    this.verify.controls['lang'].setValue(this.translate.currentLang);
    this.verify.controls['user_id'].setValue(this.user.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerifyAccountPage');
  }

  goHome(){
    
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });
    loading.present();

    this.api.verifyCode(this.verify.value).subscribe(
      response => {
      var message     = (this.translate.currentLang == 'en') ? '<img src="assets/imgs/block-user.png" class="img_alert animated shake"> Sorry This User Has Been Warned'   : '<img src="assets/imgs/block-user.png" class="img_alert animated shake"> عذراََ لقد تم حذر هذا المستخدم';
      var Done        = (this.translate.currentLang == 'en') ? 'Go To The Register'                : 'الذهاب إلى التسجيل';
      const toast = this.toastCtrl.create({
        message: response.message,
        duration: 3000
      });
      toast.present();
      if (response.key == "1") {
        // this.navCtrl.push("RequestPage");
        this.navCtrl.push("LoginPage");
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

}
