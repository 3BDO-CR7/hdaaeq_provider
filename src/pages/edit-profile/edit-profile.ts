import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ToastController, ActionSheetController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { TranslateService } from '@ngx-translate/core';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiProvider} from "../../service/api/api";

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  model:any ={city:""}
  address = "العنوان";
  countries = [];
  cities = [];
  city  : any;
  avatar;
  user;
  editProfile: FormGroup;
  
  constructor(
    public navCtrl            : NavController, 
    public navParams          : NavParams,
    public modalCtrl          : ModalController,
    private camera            : Camera,
    public translate          : TranslateService,
    public loadingCtrl        : LoadingController,
    public formBuilder        : FormBuilder,
    public api                : ApiProvider,
    public toastCtrl          : ToastController,
    public actionSheetCtrl    : ActionSheetController,
    public alertCtrl          : AlertController) {

      this.editProfile                =      this.formBuilder.group({
        name                          :      ['', Validators.required],
        phone                         :      ['', Validators.compose([Validators.maxLength(10)])],
        email                         :      ['', Validators.compose([Validators.maxLength(40), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
        city_id                       :      ['', Validators.required],
        country_id                    :      ['', Validators.required],
        user_id                       :      [''],
        lang                          :      [],
        lat                           :      [],
        lng                           :      [],
        address                       :      [],
        image                         :      [],
      });

      this.user = JSON.parse(localStorage.getItem('hdaaeq_provider_Data'));
      this.editProfile.controls['user_id'].setValue(this.user.id);
      this.avatar =  this.user.image;
      this.editProfile.controls['lang'].setValue(this.translate.currentLang);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
    
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });
    loading.present();

    this.api.countries({lang : this.translate.currentLang}).subscribe(
      response => {
        this.countries = response.data;
    },
      error => {
        loading.dismiss();
    },
      () => {
        loading.dismiss();
    });

  }

  country_cities(id){
    let data = { country_id : id };
    this.api.cities({country_id : id , lang : this.translate.currentLang}).subscribe(
      response => {
        this.cities = response.data;
    });
  }

  goLocation(){
    const modal = this.modalCtrl.create("SelectLocationPage");
    modal.present();
  }

  goProfile()
  {

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });
    loading.present();

    this.api.editprofile(this.editProfile.value).subscribe(
      response => {

      const toast = this.toastCtrl.create({
      message: response.message,
      duration: 3000
      });
      toast.present();

      var message     = (this.translate.currentLang == 'en') ? '<img src="assets/imgs/block-user.png" class="img_alert animated shake"> Sorry This User Has Been Warned'   : '<img src="assets/imgs/block-user.png" class="img_alert animated shake"> عذراََ لقد تم حذر هذا المستخدم';
      var Done        = (this.translate.currentLang == 'en') ? 'Go To The Register'                : 'الذهاب إلى التسجيل';
      
      if(response.key == "1"){
        localStorage.setItem('hdaaeq_provider_Data',JSON.stringify(response.data));
        this.navCtrl.push("ProfilePage");
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
  
  openGallery( )
  {
  const options: CameraOptions = {
  quality: 100,
  destinationType: this.camera.DestinationType.DATA_URL,
  encodingType: this.camera.EncodingType.JPEG,
  mediaType: this.camera.MediaType.PICTURE,
  targetHeight:500,
  targetWidth:500,
    correctOrientation    : true,
  };
  
  this.camera.getPicture(options).then((imageData) => {
  this.avatar = "data:image/jpeg;base64," + imageData;
  this.editProfile.controls['image'].setValue(imageData);
  }, (err) => {
  
  });
  }
  
  takePhoto() {
  const options : CameraOptions = {
    quality: 75,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation    : true,
  };
  
  this.camera.getPicture(options).then((imageData) => {
  this.avatar = "data:image/jpeg;base64," + imageData;
  this.editProfile.controls['image'].setValue(imageData);
  }, (err) => {
  console.log(err);
  });
  
  
  
  }
  

}
