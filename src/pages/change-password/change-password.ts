import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiProvider} from "../../service/api/api";
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  
  updatePassword: FormGroup;
  user;
  user_id;
  constructor(
    public navCtrl        : NavController, 
    public navParams      : NavParams,
    public loadingCtrl    : LoadingController,
    public formBuilder    : FormBuilder,
    public api            : ApiProvider,
    public toastCtrl      : ToastController,
    public alertCtrl      : AlertController,
    private translate     : TranslateService) {

      this.updatePassword             =      this.formBuilder.group({
        old_password                  :      [''],
        new_password                  :      ['', Validators.compose([Validators.minLength(6),Validators.required])],
        confirm_Password              :      ['', Validators.required],
        user_id                       :      [],
        lang                          :      [],
      }, 
      {
        validator: this.matchingPasswords('new_password', 'confirm_Password')
      });


      this.user = JSON.parse(localStorage.getItem('hdaaeq_provider_Data'));
      this.user_id =  this.user.id;
      this.updatePassword.controls['user_id'].setValue(this.user.id);
      this.updatePassword.controls['lang'].setValue(this.translate.currentLang);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  goSetting(){

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });
    loading.present();

    this.api.editPassword(this.updatePassword.value).subscribe(
      response => {
        var message     = (this.translate.currentLang == 'en') ? '<img src="assets/imgs/block-user.png" class="img_alert animated shake"> Sorry This User Has Been Warned'   : '<img src="assets/imgs/block-user.png" class="img_alert animated shake"> عذراََ لقد تم حذر هذا المستخدم';
        var Done        = (this.translate.currentLang == 'en') ? 'Go To The Register'                : 'الذهاب إلى التسجيل'
        const toast = this.toastCtrl.create({
        message: response.message,
        duration: 3000
        });
        toast.present();
        if(response.key == "1"){
          this.navCtrl.push("SettingPage");  
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
    }, error =>{
      loading.dismiss();
    },()=>{
      loading.dismiss();
    });

  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let new_password = group.controls[passwordKey];
      let confirm_Password = group.controls[confirmPasswordKey];

      if (new_password.value !== confirm_Password.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

}
