import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, LoadingController, Navbar } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import {ApiProvider} from "../../service/api/api";

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {
  @ViewChild(Navbar) navBar: Navbar;
  Open;
  user;
  constructor(
    public navCtrl        : NavController, 
    public navParams      : NavParams, 
    private platform      : Platform,
    private translate     : TranslateService,
    public alertCtrl      : AlertController,
    public api            : ApiProvider,
    public loadingCtrl    : LoadingController) {

      this.user = JSON.parse(localStorage.getItem('hdaaeq_provider_Data'));
      this.Open = this.user.notification;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
  }

  ionViewDidEnter() {

    var last :any = this.navCtrl.getPrevious().name;
  
    if (last == 'ProfilePage'){
      this.navBar.backButtonClick = this.previousProfile;
    }
    
    if (last == 'ChangeLangPage'){
      this.navBar.backButtonClick = this.previousLang;
    }

  }

  previousProfile() {
    this.navCtrl.push('HomePage');
  }

  previousLang() {
    this.navCtrl.push('HomePage');
  }

  goLang(){
    this.navCtrl.push("ChangeLangPage");
  }

  change(){

    this.Open = (this.Open == 1 )? 0 : this.Open = 1;

    let loading = this.loadingCtrl.create({
       spinner: 'hide',
       content: '<img src="assets/imgs/logo.png">'
    });
    loading.present();
 
    this.api.notifiaction_status({
       user_id    : this.user.id ,
       lang       : this.translate.currentLang ,
     }).subscribe(
       response => {
        var message     = (this.translate.currentLang == 'en') ? '<img src="assets/imgs/block-user.png" class="img_alert animated shake"> Sorry This User Has Been Warned'   : '<img src="assets/imgs/block-user.png" class="img_alert animated shake"> عذراََ لقد تم حذر هذا المستخدم';
        var Done        = (this.translate.currentLang == 'en') ? 'Go To The Register'                : 'الذهاب إلى التسجيل';
        if (response.key == "3") {
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
        this.user = response.data
        localStorage.setItem('hdaaeq_provider_Data', JSON.stringify(this.user));
    },
    error => {
       loading.dismiss();
    },
    () => {
       loading.dismiss();
    });
 
   }

  goProfile(){
    var message   = (this.translate.currentLang == 'en') ? 'You Must Login first ?' : 'يجب عليك التسجيل أولاََ ؟';
    var cansel    = (this.translate.currentLang == 'en') ? 'cansel' : 'إلغاء';
    var ok        = (this.translate.currentLang == 'en') ? 'ok' : 'موافق';
    if(localStorage.getItem('hdaaeq_provider_Data')) {
      this.navCtrl.push("ProfilePage");
    }else{
      const confirm = this.alertCtrl.create({
        message: message,
        buttons: [
          {
            text: ok,
            handler: () => {
              this.navCtrl.push("LoginPage");
            }
          },
          {
            text: cansel,
            handler: () => {
              
            }
          }
        ]
      });
      confirm.present();
    }
  }

  goPassword(){
    var message   = (this.translate.currentLang == 'en') ? 'You Must Login first ?' : 'يجب عليك التسجيل أولاََ ؟';
    var cansel    = (this.translate.currentLang == 'en') ? 'cansel' : 'إلغاء';
    var ok        = (this.translate.currentLang == 'en') ? 'ok' : 'موافق';
    if(localStorage.getItem('hdaaeq_provider_Data')) {
      this.navCtrl.push("ChangePasswordPage");
    }else{
      const confirm = this.alertCtrl.create({
        message: message,
        buttons: [
          {
            text: ok,
            handler: () => {
              this.navCtrl.push("LoginPage");
            }
          },
          {
            text: cansel,
            handler: () => {
              
            }
          }
        ]
      });
      confirm.present();
    }
  }

}
