import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import {ApiProvider} from "../../service/api/api";

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  divFading : any;
  notification : any;
  provider;
  text = false;

  constructor(
    public navCtrl      : NavController, 
    public navParams    : NavParams,
    public loadingCtrl  : LoadingController,
    public api          : ApiProvider,
    public toastCtrl    : ToastController,
    private translate   : TranslateService,
    public alertCtrl    : AlertController) {

   this.provider = JSON.parse(localStorage.getItem('hdaaeq_provider_Data'));

   this.getData();

  }

  getData(){
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });
    loading.present();
    loading.dismiss();
    this.api.notification({user_id : this.provider.id, lang : this.translate.currentLang}).subscribe(
      response => {
        var message     = (this.translate.currentLang == 'en') ? '<img src="assets/imgs/block-user.png" class="img_alert animated shake"> Sorry This User Has Been Warned'   : '<img src="assets/imgs/block-user.png" class="img_alert animated shake"> عذراََ لقد تم حذر هذا المستخدم';
        var Done        = (this.translate.currentLang == 'en') ? 'Go To The Register'                : 'الذهاب إلى التسجيل';
        const toast = this.toastCtrl.create({
        message: response.message,
        duration: 3000
        });
        toast.present();
        if(response.key == "0") { 
          this.text = true;
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
          this.notification = response.data;
        }
      },
      error => {
        loading.dismiss();
      },
      () => {
        loading.dismiss();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }
  
  goRemove(id,e,index){


    var message   = (this.translate.currentLang == 'en') ? 'Do you want to erase this notifiaction ?' : 'هل تريد مسح هذا الأشعار ؟';
    var cansel    = (this.translate.currentLang == 'en') ? 'cansel' : 'إلغاء';
    var ok        = (this.translate.currentLang == 'en') ? 'ok' : 'موافق';
    const confirm = this.alertCtrl.create({
      message: message,
      buttons: [
        {
          text: ok,
          handler: () => {
            this.api.deleteNotifiaction({notifiaction_id : id}).subscribe(
              response => {
                let element  = document.getElementById(`notification-${id}`);
                element.className += ' removnig';
                setTimeout(()=>{
                  this.notification.splice(index,1)
                },1000)
              },err=>{

              },()=>{

              }
            );
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
