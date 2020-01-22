import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import {ApiProvider} from "../../service/api/api";

@IonicPage()
@Component({
  selector: 'page-closed-orders',
  templateUrl: 'closed-orders.html',
})
export class ClosedOrdersPage {

  data;
  orders : any;
  provider;

  constructor(
    public navCtrl      : NavController, 
    public navParams    : NavParams,
    public loadingCtrl  : LoadingController,
    public api          : ApiProvider,
    public toastCtrl    : ToastController,
    private translate   : TranslateService,
    public alertCtrl    : AlertController) {

      this.orders = [] ;
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClosedOrdersPage');

    this.provider = JSON.parse(localStorage.getItem('hdaaeq_provider_Data'));

    if(localStorage.getItem('hdaaeq_provider_Data')) { 
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: '<img src="assets/imgs/logo.png">'
      });
      loading.present();
      this.api.finishOrder({
        provider_id : this.provider.id , 
        lang        : this.translate.currentLang
      }).subscribe(
        response => {
        const toast = this.toastCtrl.create({
          message: response.message,
          duration: 3000
          });
        toast.present();
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
        this.data   = response.data;
        this.orders = response.data.orders;
        },
        error => {
          loading.dismiss();
        },
        () => {
          loading.dismiss();
      });
    }

  }

  goBank(){
    this.navCtrl.push("BankTransferPage");
  }

}
