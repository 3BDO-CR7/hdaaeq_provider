import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import {ApiProvider} from "../../service/api/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  data;
  
  private sentMessage      :      FormGroup  = this.formBuilder.group({
    name                   :      ['', Validators.required],
    email                  :      ['', Validators.compose([Validators.maxLength(40), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
    message                :      ['', Validators.required],
    lang                   :      [],
  });

  constructor(
    public navCtrl        : NavController, 
    public navParams      : NavParams,
    public loadingCtrl    : LoadingController,
    public api            : ApiProvider,
    private translate     : TranslateService,
    public formBuilder    : FormBuilder,
    public toastCtrl      : ToastController,
    public alertCtrl      : AlertController) {

      
      this.sentMessage.controls['lang'].setValue(this.translate.currentLang);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage');
  }

  ionViewWillEnter(){
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });
    loading.present();

    this.api.contact({lang : this.translate.currentLang}).subscribe(
      response => {
        this.data = response.data;
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
      },
      error => {
        loading.dismiss();
      },
      () => {
        loading.dismiss();
      });
  }

  goMessage(){
    this.api.sentMessage(this.sentMessage.value).subscribe(
      response => {
        const toast = this.toastCtrl.create({
          message: response.message,
          duration: 3000
        });
        toast.present();
      var message     = (this.translate.currentLang == 'en') ? '<img src="assets/imgs/block-user.png" class="img_alert animated shake"> Sorry This User Has Been Warned'   : '<img src="assets/imgs/block-user.png" class="img_alert animated shake"> عذراََ لقد تم حذر هذا المستخدم';
      var Done        = (this.translate.currentLang == 'en') ? 'Go To The Register'                : 'الذهاب إلى التسجيل';
      if (response.key == "1") {
        this.sentMessage.reset();
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
      }
      },
      error => {
        // loading.dismissAll();
      },()=>{
        // loading.dismissAll();
      }
      );

  }

  

}
