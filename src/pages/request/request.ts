import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController, ToastController, AlertController } from 'ionic-angular';

import {ApiProvider} from "../../service/api/api";
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPage {

  pet = "New-requests";
  iconRtl = "icon-right";
  iconLtr = "icon-right";
  iconCart = "icon-cart-Ltr";
  orders : any;
  activeorders : any;
  provider;
 
  constructor(
    public navCtrl      : NavController, 
    public navParams    : NavParams,
    public platform     : Platform,
    public loadingCtrl  : LoadingController,
    public api          : ApiProvider,
    public toastCtrl    : ToastController,
    public alertCtrl    : AlertController,
    private translate   : TranslateService) {

    this.orders         = [] ;
    this.activeorders   = [] ;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');
    if (this.platform.isRTL) {
      this.iconRtl="icon-right";
      this.iconLtr="icon-left";
      this.iconCart="icon-cart-Ltr";
    } else {
      this.iconRtl="icon-left";
      this.iconLtr="icon-right";
      this.iconCart="icon-cart-Rtl";
    }

    this.provider = JSON.parse(localStorage.getItem('hdaaeq_provider_Data'));

    this.newOrder();

  }

  newOrder(){
    if(localStorage.getItem('hdaaeq_provider_Data')) { 
        let loading = this.loadingCtrl.create({
          spinner: 'hide',
          content: '<img src="assets/imgs/logo.png">'
        });
        loading.present();
        this.api.newOrder({provider_id : this.provider.id,lang : this.translate.currentLang}).subscribe(
          response => {

            const toast = this.toastCtrl.create({
            message: response.message,
            duration: 3000
            });
            toast.present();

            console.log('data ==', response.data)

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

            this.orders = response.data;
          },
          error => {
            loading.dismiss();
          },
          () => {
            loading.dismiss();
        });
    }
  }

  activeOrder(){
    if(localStorage.getItem('hdaaeq_provider_Data')) { 
      let loading = this.loadingCtrl.create({
        spinner: 'hide',
        content: '<img src="assets/imgs/logo.png">'
      });
      loading.present();
      this.api.activeOrder({provider_id : this.provider.id}).subscribe(
        response => {
          const toast = this.toastCtrl.create({
          message: response.message,
          duration: 3000
          });
          toast.present();
          this.activeorders = response.data;
        },
        error => {
          loading.dismiss();
        },
        () => {
          loading.dismiss();
      });
    }
  }

  goCurrentOrders(id){
    this.navCtrl.push("CurrentRequestsPage",{'id':id});
  }
  
  goNewOrders(id){
    this.navCtrl.push("NewOrdersPage",{'id':id});
  }

  openNoty(){
    this.navCtrl.push("NotificationPage");
  }



}
