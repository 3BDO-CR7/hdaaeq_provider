import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, LoadingController,ToastController, Platform, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { TranslateService } from '@ngx-translate/core';
import { ApiProvider} from "../../service/api/api";
import { OneSignal } from '@ionic-native/onesignal';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  model  : any  = {};
  provider      = 1;
  codes         = [];
  pet           = "loginPhone";
  iconLtr       = "left";
  countryCode   ;
  private userPhone       :      FormGroup  = this.formBuilder.group({
    phone                 :      ['', Validators.required],
    password              :      ['', Validators.required],
    lang                  :      [],
    provider              :      [],
    device_id             :      [],
    country_code          :      [],
    value_input           :      [0],
  });

  private userEmail       :      FormGroup  = this.formBuilder.group({
    email                 :      ['', Validators.compose([Validators.maxLength(40), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
    password              :      ['', Validators.required],
    lang                  :      [],
    provider              :      [],
    device_id             :      [],
    value_input           :      [1],
  });

  constructor(
      public navCtrl          : NavController,
      public navParams        : NavParams,
      public loadingCtrl      : LoadingController,
      public formBuilder      : FormBuilder,
      public api              : ApiProvider,
      public toastCtrl        : ToastController,
      private translate       : TranslateService,
      public event            : Events,
      private oneSignal       : OneSignal,
      public platform         : Platform,
      public alertCtrl        : AlertController) {

    // this.userPhone.controls['value_input'].setValue(this.value_input);
    this.userPhone.controls['lang'].setValue(this.translate.currentLang);
    this.userPhone.controls['provider'].setValue(this.provider);
    // this.userPhone.controls['device_id'].setValue('3333');
    // this.userEmail.controls['device_id'].setValue('3333');

    this.userEmail.controls['lang'].setValue(this.translate.currentLang);
    this.userEmail.controls['provider'].setValue(this.provider);

    platform.ready().then(() => {
      this.oneSignal.endInit();
      this.oneSignal.getIds().then((id) => {
        this.userPhone.controls["device_id"].setValue(id.userId)
        this.userEmail.controls["device_id"].setValue(id.userId)
      });
    });

  }

  ionViewDidLoad() {

    if (this.platform.isRTL) {
      this.iconLtr="left";
    } else {
      this.iconLtr="right";
    }

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });
    loading.present();
    this.api.codes({lang : this.translate.currentLang}).subscribe(
        response => {
          this.codes        = response.data;
          this.countryCode  =  this.codes[0].code;

        },
        error => {
          loading.dismiss();
        },
        () => {
          loading.dismiss();
        });
  }

  goRegister(){
    this.navCtrl.push("RegisterPage");
  }

  goForgetPasswor(){
    this.navCtrl.push("ForgetPasswordPage");
  }

  goUserPhone(){
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });

    loading.present();

    loading.dismissAll()

    this.api.signIn(this.userPhone.value).subscribe(
        response =>{
          var message     = (this.translate.currentLang == 'en') ? '<img src="assets/imgs/block-user.png" class="img_alert animated shake"> Sorry This User Has Been Warned'   : '<img src="assets/imgs/block-user.png" class="img_alert animated shake"> عذراََ لقد تم حذر هذا المستخدم';
          var Done        = (this.translate.currentLang == 'en') ? 'Go To The Register'                : 'الذهاب إلى التسجيل'
          const toast = this.toastCtrl.create({
            message: response.massage,
            duration: 3000
          });
          toast.present();
          if(response.key == "0"){
            const toast = this.toastCtrl.create({
              message: response.massage,
              duration: 3000
            });
            toast.present();
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
          }else{
            this.event.publish('user_is_in',{name : response.data.name , image : response.data.image});
            localStorage.setItem('hdaaeq_provider_Data',JSON.stringify(response.data));
            this.navCtrl.push("RequestPage");
          }
        },
        error => {
          loading.dismiss();
        },
        () => {
          loading.dismiss();
        });
  }

  goUserEmail(){
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });

    loading.present();

    loading.dismissAll()

    this.api.signIn(this.userEmail.value).subscribe(
        response =>{
          var message     = (this.translate.currentLang == 'en') ? '<img src="assets/imgs/block-user.png" class="img_alert animated shake"> Sorry This User Has Been Warned'   : '<img src="assets/imgs/block-user.png" class="img_alert animated shake"> عذراََ لقد تم حذر هذا المستخدم';
          var Done        = (this.translate.currentLang == 'en') ? 'Go To The Register'                : 'الذهاب إلى التسجيل'
          const toast = this.toastCtrl.create({
            message: response.massage,
            duration: 3000
          });
          toast.present();
          if(response.key == "0"){
            const toast = this.toastCtrl.create({
              message: response.massage,
              duration: 3000
            });
            toast.present();
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
          }else{
            this.event.publish('user_is_in',{name : response.data.name , image : response.data.image});
            localStorage.setItem('hdaaeq_provider_Data',JSON.stringify(response.data));
            this.navCtrl.push("RequestPage");
          }
        },
        error => {
          loading.dismiss();
        },
        () => {
          loading.dismiss();
        });
  }

  goVistor(){
    this.navCtrl.push("HomePage");
  }

}
