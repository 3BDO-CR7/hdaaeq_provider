import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, LoadingController,ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { ApiProvider } from "../../service/api/api";
import { OneSignal } from '@ionic-native/onesignal';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  iconLtr       = "icon-left";
  model : any   = { city : " " }
  address       = "العنوان";
  countries     = [];
  cities        = [];
  modal         : any;
  city          : any;
  signUp        : FormGroup;
  code          : any;
 
  constructor(
    public navCtrl          : NavController, 
    public navParams        : NavParams,
    public platform         : Platform,
    public translate        : TranslateService,
    public modalCtrl        : ModalController,
    public loadingCtrl      : LoadingController,
    public formBuilder      : FormBuilder,
    public api              : ApiProvider,
    public toastCtrl        : ToastController,
    private oneSignal       : OneSignal
    ) {

    platform.ready().then(() => {
      this.oneSignal.endInit();
      this.oneSignal.getIds().then((id) => {
        this.signUp.controls["device_id"].setValue(id.userId);
      });
    });

    this.signUp                     =      this.formBuilder.group({
      name                          :      ['', Validators.required],
      phone                         :      ['', Validators.required],
      email                         :      ['', Validators.compose([Validators.maxLength(40), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      city_id                       :      ['', Validators.required],
      country_id                    :      ['', Validators.required],
      password                      :      ['', Validators.compose([Validators.minLength(6),Validators.required])],
      confirmPassword               :      ['', Validators.required],
      lang                          :      [],
      lat                           :      [],
      country_code                  :      [],
      lng                           :      [],
      address                       :      [],
      device_id                     :      [],
    }, 
    {
      validator: this.matchingPasswords('password', 'confirmPassword')
    });
  }

  ionViewWillEnter(){

    // this.signUp.controls['device_id'].setValue('3333');
    this.signUp.controls['lang'].setValue(this.translate.currentLang);
    this.signUp.controls['country_code'].setValue(this.code);
    
  }

  
    
  ionViewDidLoad() {
    
    console.log('ionViewDidLoad RegisterPage');

    if (this.platform.isRTL) {
      this.iconLtr="icon-left";
    } else {
      this.iconLtr="icon-right";
    }
    this.translate.get("city").subscribe(value => {
      this.city = value;
    });

    
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });
    loading.present();

    this.api.countries({lang : this.translate.currentLang}).subscribe(
      response => {
        this.countries = response.data;
        console.log('data ===', response.data);
    },
      error => {
        loading.dismiss();
    },
      () => {
        loading.dismiss();
    });

  }

  // country_cities(id){
  //   let data = { country_id : id };
  //   this.api.cities({country_id : id , lang : this.translate.currentLang}).subscribe(
  //     response => {
  //       this.cities = response.data;
  //       this.code   = response.code;
  //       this.signUp.controls['country_code'].setValue(this.code);
  //   });
  // }

  country_cities(id){

    let data = { country_id : id };

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });
    loading.present();
    this.api.cities({
      country_id    : id ,
      lang          : this.translate.currentLang
    }).subscribe(
        response => {
          this.cities = response.data;
          this.code   = response.code;
          this.signUp.controls['country_code'].setValue(this.code);
        },()=>{
          loading.dismiss();
        },()=>{
          loading.dismiss();
        });
  }

  
  goHome(){
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/logo.png">'
    });
    loading.present();
    loading.dismissAll()
    this.api.signUp(this.signUp.value).subscribe(
      (data: any) => {
        const toast = this.toastCtrl.create({
          message: data.message,
          duration: 3000
        });
        toast.present();
      if (data.key == "1") {
        localStorage.setItem('hdaaeq_register_provider_Data', JSON.stringify(data.data));
        this.navCtrl.setRoot("VerifyAccountPage");
      } 
      },
      error => {
        loading.dismissAll();
      },()=>{
        loading.dismissAll();
      }
      );

  }

  goLogin(){
    this.navCtrl.push("LoginPage")
  }

  openMap(){
    const modal = this.modalCtrl.create("LocationPage");
    modal.onDidDismiss(data => {
      this.address = JSON.parse(localStorage.getItem("hdaaeq_map_address"))
      this.signUp.controls['address'].setValue(data.city);
      this.signUp.controls['address'].setValue(JSON.parse(localStorage.getItem("hdaaeq_map_address")));
      this.signUp.controls['lat'].setValue(JSON.parse(localStorage.getItem("hdaaeq_map_lat")));
      this.signUp.controls['lng'].setValue(JSON.parse(localStorage.getItem("hdaaeq_map_lng")));
    });
    modal.present();
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

}
