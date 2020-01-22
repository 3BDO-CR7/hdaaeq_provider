import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, LoadingController, ActionSheetController, AlertController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiProvider} from "../../service/api/api";
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-bank-transfer',
  templateUrl: 'bank-transfer.html',
})
export class BankTransferPage {

  iconDir       : any = 'icon-left';
  avatar        = 'assets/imgs/camera.png';
  banckTransfer : FormGroup;
  user;
  provider;
  Data;
  constructor(
    public navCtrl            : NavController, 
    public navParams          : NavParams,
    private platform          : Platform,
    private camera            : Camera,
    public translate          : TranslateService,
    public formBuilder        : FormBuilder,
    public api                : ApiProvider,
    public toastCtrl          : ToastController,
    public loadingCtrl        : LoadingController,
    public actionSheetCtrl    : ActionSheetController,
    public alertCtrl          : AlertController) {

      this.banckTransfer              =      this.formBuilder.group({
        name                          :      ['', Validators.required],
        bank_name                     :      ['', Validators.required],
        account_num                   :      ['', Validators.required],
        account_iban                  :      [],
        transfer_image                :      [],
        amount                        :      [],
        provider_id                   :      [],
      });

      this.user = JSON.parse(localStorage.getItem('hdaaeq_provider_Data'));
      this.banckTransfer.controls['provider_id'].setValue(this.user.id);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BankTransferPage');
    if(this.platform.isRTL){
      this.iconDir  = 'icon-left';
    } else{
      this.iconDir  = 'icon-right';
    }
  }

  ionViewWillEnter(){
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });
    loading.present();

    this.provider = JSON.parse(localStorage.getItem('hdaaeq_provider_Data'));

    this.api.bankAccount({provider_id : this.provider.id,lang : this.translate.currentLang}).subscribe(
      response => {
        this.Data = response.data;
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

  goBank(){

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });
    loading.present();

    this.api.banckTransfer(this.banckTransfer.value).subscribe(
      response => {
        const toast = this.toastCtrl.create({
        message: response.message,
        duration: 3000
        });
        toast.present();
        this.banckTransfer.reset();
        if(response.key == "1"){
          this.navCtrl.push("RequestPage");
        }else if(response.key == "3"){
          this.navCtrl.push("LoginPage");
        }
      }
    );

  }

  presentActionSheet() {
    var addimage        = (this.translate.currentLang == 'en') ? 'Add Image'      : 'إضافة صورة';
    var take            = (this.translate.currentLang == 'en') ? 'Take Photo'     : 'إلتقاط صورة';
    var choose          = (this.translate.currentLang == 'en') ? 'Choose Photo'   : 'إختر صورة';
    var cancel          = (this.translate.currentLang == 'en') ? 'Cancel'         : 'إلغاء';
    let actionSheet = this.actionSheetCtrl.create({
    title: addimage,
    buttons: [
      {
          text: take,
          handler: () => {
          this.openGallery();
      }
    },
      {
          text: choose,
          handler: () => {
          this.takePhoto();
      }
    },
      {
          text: cancel,
      handler: () => {
      
      }
    }]
    });
    
    actionSheet.present();
  }

  openGallery(){
    const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    targetHeight:500,
    targetWidth:500,
    };
    
    this.camera.getPicture(options).then((imageData) => {
    this.avatar = "data:image/jpeg;base64," + imageData;
    this.banckTransfer.controls['transfer_image'].setValue(imageData);
    }, (err) => {
      console.log(err);
    });
  }
  
  takePhoto(){
    const options : CameraOptions = {
      quality: 75,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
    };
    
    this.camera.getPicture(options).then((imageData) => {
    this.avatar = "data:image/jpeg;base64," + imageData;
    this.banckTransfer.controls['transfer_image'].setValue(imageData);
    }, (err) => {
    console.log(err);
    });
  }

}
