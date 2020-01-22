import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Platform, MenuController, LoadingController } from 'ionic-angular';

import {TranslateService} from "@ngx-translate/core";

@IonicPage()
@Component({
  selector: 'page-choose-lang',
  templateUrl: 'choose-lang.html',
})
export class ChooseLangPage {

  constructor(
    public navCtrl      : NavController, 
    public navParams    : NavParams,
    private translate   : TranslateService,
    public platform     : Platform,
    public event        : Events,
    public menu         : MenuController,
    public loadingCtrl  : LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseLangPage');
  }

  goLogin(lang){
    if(lang == 'en')
    {
      this.platform.setDir('ltr',true)
      this.menu.enable(true, 'left')
      this.menu.enable(false, 'right')
      localStorage.setItem('hdaaeq_lang',lang)
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
      this.event.publish('change_lang')
    }else{
      this.platform.setDir('rtl',true);
      this.menu.enable(false, 'left')
      this.menu.enable(true, 'right')
      localStorage.setItem('hdaaeq_lang',lang)
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);
      this.event.publish('change_lang')
    }
    
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });

    loading.present();

    setTimeout(() => {
        loading.dismiss();
    }, 3000);
    this.navCtrl.setRoot('LoginPage')
    loading.dismissAll()
  }

}
