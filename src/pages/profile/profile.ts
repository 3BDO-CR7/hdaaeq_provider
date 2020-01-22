import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, LoadingController, Navbar, AlertController } from 'ionic-angular';
import { t } from '@angular/core/src/render3';


import { TranslateService } from '@ngx-translate/core';
import {ApiProvider} from "../../service/api/api";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild(Navbar) navBar: Navbar;
  user : any;
  iconLtr = "icon-right";
  constructor(
    public navCtrl        : NavController, 
    public navParams      : NavParams,
    public platform       : Platform,
    public modalCtrl      : ModalController,
    public loadingCtrl    : LoadingController,
    public api            : ApiProvider,
    private translate     : TranslateService,
    public alertCtrl      : AlertController) {

      if (this.platform.isRTL) {
        this.iconLtr="icon-left";
      } else {
        this.iconLtr="icon-right";
      }

      
      this.user = JSON.parse(localStorage.getItem('hdaaeq_provider_Data'));

      if(localStorage.getItem('hdaaeq_provider_Data')) {
        let loading = this.loadingCtrl.create({
          spinner: 'hide',
          content: '<img src="assets/imgs/logo.png">'
        });
        loading.present();
    
        this.api.profile({user_id : this.user.id , lang : this.translate.currentLang}).subscribe(
          response => {
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
            this.user = response.data;
          },
          error => {
            loading.dismiss();
          },
          () => {
            loading.dismiss();
          });
      }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewDidEnter() {

    var last :any = this.navCtrl.getPrevious().name;
  
    if (last == 'EditProfilePage'){
      this.navBar.backButtonClick = this.backButtonClick;
    }
  }
  backButtonClick() {
    this.navCtrl.push('SettingPage');
  }

  goEdite(){
    this.navCtrl.push("EditProfilePage")
  }
  
  goLocation(){
      const modal = this.modalCtrl.create("LocationPage");
      modal.present();
  }

}
