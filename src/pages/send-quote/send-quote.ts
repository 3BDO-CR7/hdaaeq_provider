import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, ToastController, LoadingController, AlertController } from 'ionic-angular';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiProvider} from "../../service/api/api";
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-send-quote',
  templateUrl: 'send-quote.html',
})
export class SendQuotePage {
  spanRtl   = "right";
  iconDir   : any = 'icon-left';
  total     : any = 0;
  sendOffer : FormGroup;
  data      = [];
  offers    = [];
  sup_serr  = [];
  deta;
  serves;
  provider;
  provider_id;
  order_id;
  constructor(
    public navCtrl        : NavController, 
    public navParams      : NavParams,
    public platform       : Platform,
    public modalCtrl      : ModalController,
    public formBuilder    : FormBuilder,
    public api            : ApiProvider,
    public toastCtrl      : ToastController,
    public loadingCtrl    : LoadingController,
    public alertCtrl      : AlertController,
    private translate     : TranslateService) {

      
      this.order_id       = JSON.parse(localStorage.getItem('hdaaeq_provider_order_id'));

      this.sendOffer                  =      this.formBuilder.group({
        offer                         :      ['', Validators.required],
        date                          :      ['', Validators.required],
        time                          :      ['', Validators.required],
        provider_id                   :      [],
        order_id                      :      [],
        lang                          :      [],
      });

      this.provider = JSON.parse(localStorage.getItem('hdaaeq_provider_Data'));
      this.sendOffer.controls["provider_id"].setValue(this.provider.id);
      this.sendOffer.controls["order_id"].setValue(this.order_id);
      this.sendOffer.controls['lang'].setValue(this.translate.currentLang);
      
  }

  ionViewDidLoad() {
    if (this.platform.isRTL) {
      this.spanRtl  = "left";
      this.iconDir  = 'icon-left';
    } else {
      this.spanRtl  = "right";
      this.iconDir  = 'icon-right';
    }
  }

  ionViewWillLeave(){
    this.offers = [];
  }

  ionViewWillEnter(){

    this.offers = [];
    
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });
    loading.present();

    this.api.orderservices({
      order_id    : this.order_id ,
      lang        : this.translate.currentLang
    }).subscribe(
      response => {

        const toast = this.toastCtrl.create({
        message: response.message,
        duration: 3000
        });
        toast.present();

        console.log('data ===', response.data);

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

        this.serves = response.data

    }, error =>{
      loading.dismiss();
    },()=>{
      loading.dismiss();
    });

  }

  openCalender(){
    const modal = this.modalCtrl.create("CalenderPage");
    modal.onDidDismiss(deta => {
      this.deta = deta.date + '-' + (deta.month + 1) + '-' + deta.year;
      this.sendOffer.controls["date"].setValue(this.deta);
    });
    modal.present();
  }

  getPrice(e,val){
    this.total = 0;
    var inputPrice  = document.getElementsByClassName("input-price");
    var category_id = document.getElementsByClassName("input_category");
    // var unit_details = document.getElementsByClassName("unit_details");
    for (let i = 0 ; i < inputPrice.length ; i ++)
    {
       let id             = inputPrice[i].getAttribute('id');
       let idCate         = category_id[i].getAttribute('id');
       // let unitDetails    = unit_details[i].getAttribute('id');

       let inputVal        = inputPrice[i] as HTMLInputElement;
       let price           = ( parseInt(inputVal.value) == NaN || inputVal.value == '') ? 0 : parseInt(inputVal.value);
       let single_price    = ( parseInt(inputVal.value) == NaN || inputVal.value == '') ? 0 : parseInt(inputVal.value);
       let unitDetails     = ( parseInt(inputVal.min) == NaN || inputVal.min == '') ? 0 : parseInt(inputVal.min);
       price               = (unitDetails) ? unitDetails * price : price;
       let obj             = {
           cart_service_id : id ,
           price           : single_price,
           category_id     : idCate ,
           unit_details    : unitDetails
       };
       console.log('obj ' , obj);
       let arr             = this.offers.find(o => o.cart_service_id == id);
       let index           = this.offers.indexOf(arr);
       if(index > -1)
       {
            this.offers[index].price = single_price;
       }else{
            this.offers.push(obj);
       }
           this.total += price;

    }
           this.sendOffer.controls['offer'].setValue(this.offers);
  }

  Sent(){

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });
    loading.present();

    this.api.sendOffer(this.sendOffer.value).subscribe(
      response => {

        const toast = this.toastCtrl.create({
        message: response.message,
        duration: 3000
        });
        toast.present();

        if(response.key == "1"){
            this.offers = [];
            this.navCtrl.push('RequestPage');
        }

    }, error =>{
      loading.dismiss();
    },()=>{
      loading.dismiss();
    });
    
   }

}
