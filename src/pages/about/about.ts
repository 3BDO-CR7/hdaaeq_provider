import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import {ApiProvider} from "../../service/api/api";

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  data;

  constructor(
    public navCtrl      : NavController, 
    public navParams    : NavParams,
    private translate   : TranslateService,
    public loadingCtrl  : LoadingController,
    public api          : ApiProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

  ionViewWillEnter(){
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });
    loading.present();

    this.api.about({lang : this.translate.currentLang}).subscribe(
      response => {
        this.data = response.data;
      },
      error => {
        loading.dismiss();
      },
      () => {
        loading.dismiss();
      });
  }

}
