import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events, MenuController, LoadingController  } from 'ionic-angular';

import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-change-lang',
  templateUrl: 'change-lang.html',
})
export class ChangeLangPage {
  lang : "AR";
  constructor(
    public navCtrl          : NavController, 
    public navParams        : NavParams,
    public platform         : Platform,
    public translate        : TranslateService,
    public event            : Events,
    public menu             : MenuController,
    public loadingCtrl      : LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeLangPage');
  }

  onChange() {
    if(this.lang == "AR"){
      this.platform.setDir('rtl',true);
      localStorage.setItem('hdaaeq_lang',this.lang )
      this.translate.setDefaultLang(this.lang );
      this.menu.enable(true, 'right');
      this.menu.enable(false, 'left');
      this.translate.use(this.lang );
      this.event.publish('change_lang');
      this.translate.setDefaultLang("ar");
      this.translate.use("ar");
    }else{
      this.platform.setDir('ltr',true);
      localStorage.setItem('hdaaeq_lang',this.lang );
      this.menu.enable(false, 'right');
      this.menu.enable(true, 'left');
      this.translate.setDefaultLang(this.lang );
      this.translate.use(this.lang );
      this.event.publish('change_lang');
      this.translate.setDefaultLang("en");
      this.translate.use("en"); 
    }

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });

    loading.present();

    setTimeout(() => {
        loading.dismiss();
    }, 3000);
    loading.dismissAll()
    this.navCtrl.setRoot('SettingPage');

  }

}
