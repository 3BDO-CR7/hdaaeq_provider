import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController,ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiProvider} from "../../service/api/api";

@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {
  
  private forgetpassword      :      FormGroup  = this.formBuilder.group({
    phone                     :      ['', Validators.required],
    lang                      :      [],
  });

  constructor(
    public navCtrl          : NavController, 
    public navParams        : NavParams,
    public translate        : TranslateService,
    public loadingCtrl      : LoadingController,
    public formBuilder      : FormBuilder,
    public api              : ApiProvider,
    public toastCtrl        : ToastController,
    public platform         : Platform) {
  }

  ionViewWillEnter(){
    this.forgetpassword.controls['lang'].setValue(this.translate.currentLang);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }
  
  goNewpassword(){
    
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });
    loading.present();

    this.api.sentCode(this.forgetpassword.value).subscribe(
      (data: any) => {
      if (data.key == "0") {
        const toast = this.toastCtrl.create({
          message: data.massage,
          duration: 3000
        });
        toast.present();
      } else {
        this.navCtrl.push("NewPasswordPage");
      }
      },
      error => {
        loading.dismissAll();
      },()=>{
        loading.dismissAll();
      }
      );

  }

}
