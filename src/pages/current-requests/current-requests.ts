import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ToastController, AlertController } from 'ionic-angular';

import {ApiProvider} from "../../service/api/api";
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-current-requests',
  templateUrl: 'current-requests.html',
})
export class CurrentRequestsPage {

  data;
  images      = [];
  serves      = [];
  arr_order   = []
  id;
  lat_provider;
  lng_provider;

  constructor(
    public navCtrl      : NavController, 
    public navParams    : NavParams,
    public loadingCtrl  : LoadingController,
    public api          : ApiProvider,
    public toastCtrl    : ToastController,
    public modalCtrl    : ModalController,
    private translate   : TranslateService,
    public alertCtrl    : AlertController) {

    

  }

  ionViewWillEnter(){

    this.id = this.navParams.get('id');

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });
    loading.present();
    this.api.orderActivedetails({
      order_id    : this.id , 
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
        this.data         = response.data;
        this.arr_order    = response.data.carts;
        this.images       = response.data.images;
        this.serves       = response.data.services;
        this.lat_provider = response.data.user_lat;
        this.lng_provider = response.data.user_lng;
      },
      error => {
        loading.dismiss();
      },
      () => {
        loading.dismiss();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrentRequestsPage');
  }

  showLocation(){
    const modal = this.modalCtrl.create("MapPage",{
      lat: this.lat_provider,
      lng: this.lng_provider,
    });
    modal.present();
  }

  goFading(id, e) {

    var els = document.querySelectorAll('.view-section')
    for (var i = 0; i < els.length; i++) {
      els[i].classList.remove('fading');
    }

    let element = document.getElementById(`second-${id}`);

    if (element.getAttribute('value') == 'active') {
      element.classList.remove('fading');
      element.setAttribute('value', '');
    } else {
      element.setAttribute('value', 'active');
      element.classList.add('fading');
    }
  }

}
