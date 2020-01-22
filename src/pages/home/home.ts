import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  iconRtl = "icon-right";
  iconLtr = "icon-right";
  constructor(
    public navCtrl      : NavController,
    public navParams    : NavParams,
    public platform     : Platform,
    private translate   : TranslateService,
    public alertCtrl    : AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    if (this.platform.isRTL) {
      this.iconRtl="icon-right";
      this.iconLtr="icon-left";
    } else {
      this.iconRtl="icon-left";
      this.iconLtr="icon-right";
    }
  }

  openNoty(){
    var message   = (this.translate.currentLang == 'en') ? 'You Must Login first ?' : 'يجب عليك التسجيل أولاََ ؟';
    var cansel    = (this.translate.currentLang == 'en') ? 'cansel' : 'إلغاء';
    var ok        = (this.translate.currentLang == 'en') ? 'ok' : 'موافق';
    if(localStorage.getItem('hdaaeq_login_user_Data')) {
      this.navCtrl.push("NotificationPage");
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

  gologin(){
    this.navCtrl.push("LoginPage");
  }

}
