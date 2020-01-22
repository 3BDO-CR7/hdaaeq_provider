import { Component, ViewChild } from '@angular/core';
import { MenuController, Events, Nav, ToastController, AlertController, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//For Translation
import { TranslateService } from '@ngx-translate/core';
import {ApiProvider} from "../service/api/api";
// import { SocialSharing } from '@ionic-native/social-sharing';
import { SocialSharing } from '@ionic-native/social-sharing';
import { OneSignal } from '@ionic-native/onesignal';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage : any  = "ChooseLangPage";
  login_user      = 0;
  hiden           = true;
  image           = 'assets/imgs/image.png';
  user;
  name;
  loginText;
  logoutText;
  text;
  constructor( 
    statusBar               : StatusBar, 
    splashScreen            : SplashScreen,
    private translate       : TranslateService, 
    public event            : Events,
    public menu             : MenuController,
    private socialSharing   : SocialSharing,
    public toastCtrl        : ToastController,
    public api              : ApiProvider,
    public alertCtrl        : AlertController,
    private oneSignal       : OneSignal,
    public platform         : Platform) {


      if(localStorage.getItem('hdaaeq_lang') == 'EN')
      {
        this.platform.setDir('ltr',true)
        this.menu.enable(true, 'left')
        this.menu.enable(false, 'right')
        translate.setDefaultLang('en');
        this.translate.setDefaultLang('en');
        this.translate.use('en');
      }else{
        this.platform.setDir('rtl',true);
        this.menu.enable(false, 'left')
        this.menu.enable(true, 'right')
        translate.setDefaultLang('ar');
        this.translate.setDefaultLang('ar');
        this.translate.use('ar');
      }

      platform.ready().then(() => {

        this.oneSignal.startInit('55c1b945-034e-4997-9160-1bade40d0aa4', '356792094039');
  
        this.oneSignal.inFocusDisplaying(2);
  
        this.oneSignal.handleNotificationReceived().subscribe(() => {
          // do something when notification is received
        });
  
        this.oneSignal.handleNotificationOpened().subscribe(() => {
          // do something when a notification is opened
        });
  
        this.oneSignal.endInit();
  
        this.oneSignal.getIds().then((id) => {
          localStorage.setItem('Hadaaq_DeviceId',JSON.stringify(id.userId));
        });
        
      });

      this.event.subscribe('user_logout', () =>{
          this.hiden      = true;
      });

      if(localStorage.getItem('hdaaeq_provider_Data') === null || localStorage.getItem('hdaaeq_provider_Data') === undefined) {
        this.rootPage     = 'LoginPage';
      } else {
        this.rootPage     = 'RequestPage';
      }

      if(localStorage.getItem('hdaaeq_lang') === null) {
        this.rootPage     = 'ChooseLangPage';
      }

      this.loginText      = (this.translate.currentLang == 'en') ? 'LogIn'  : 'تسجيل الدخول';
      this.logoutText     = (this.translate.currentLang == 'en') ? 'LogOut' : 'تسجيل خروج';
      
      // this.login_user     = 0;
      // this.text           = this.loginText;
      
      event.subscribe('user_is_in', (data) => {
        this.login_user   = 1;
        this.text         = this.logoutText;
        this.name         = data.name; 
        this.image        = data.image;
        this.hiden        = false;
      });

      event.subscribe('user_is_out', (data) => {
        this.login_user   = 0;
        this.text         = this.loginText;
        this.name         = data.name; 
        this.image        = data.image;
        this.hiden        = true;
      });

      // translate.setDefaultLang('ar');
      // translate.setDefaultLang('ar');
      // this.translate.setDefaultLang('ar');
      // this.translate.use('ar');

      // this.event.subscribe('change_lang',()=>{
      //   translate.setDefaultLang('ar');
      //   this.translate.setDefaultLang('ar');
      //   this.translate.use('ar');
      // })

      this.user     = JSON.parse(localStorage.getItem('hdaaeq_provider_Data'));
      // this.lang = JSON.parse(localStorage.getItem('hdaaeq_lang'));
      
      if(this.user != null){
        this.image  = this.user.image;
        this.name   = this.user.name;
        this.text   = this.logoutText;
        this.hiden  = false;
      }else{
        this.text   = this.loginText;
        this.hiden  = true;
      }

      platform.ready().then(() => {
        statusBar.styleDefault();
        splashScreen.hide();
      });

  }

  goHome(){
    this.navCtrl.push("HomePage")
  }

  goRequest(){
    var message   = (this.translate.currentLang == 'en') ? 'You Must Login first ?' : 'يجب عليك التسجيل أولاََ ؟';
    var cansel    = (this.translate.currentLang == 'en') ? 'cansel' : 'إلغاء';
    var ok        = (this.translate.currentLang == 'en') ? 'ok' : 'موافق';
    if(localStorage.getItem('hdaaeq_provider_Data')) {
      this.navCtrl.push("RequestPage")
    }else{
      const confirm = this.alertCtrl.create({
        message: message,
        buttons: [
          {
            text: ok,
            handler: () => {
              this.navCtrl.push("LoginPage");
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

  goClosed(){
    var message   = (this.translate.currentLang == 'en') ? 'You Must Login first ?' : 'يجب عليك التسجيل أولاََ ؟';
    var cansel    = (this.translate.currentLang == 'en') ? 'cansel' : 'إلغاء';
    var ok        = (this.translate.currentLang == 'en') ? 'ok' : 'موافق';
    if(localStorage.getItem('hdaaeq_provider_Data')) {
      this.navCtrl.push("ClosedOrdersPage")
    }else{
      const confirm = this.alertCtrl.create({
        message: message,
        buttons: [
          {
            text: ok,
            handler: () => {
              this.navCtrl.push("LoginPage");
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

  goAbout(){
    this.navCtrl.push("AboutPage")
  }

  goShare(){
      
    this.socialSharing.shareWithOptions({
         message: `How Have U been`
      }).then(() => {
            console.log('Shared!');
      }).catch((err) => {
            console.log('Oops, something went wrong:', err);
      });  
  }

  goContact(){
    this.navCtrl.push("ContactPage")
  }

  goSetting(){
    this.navCtrl.push("SettingPage")
  }

  goLogIn(){
    if(this.login_user == 0){
      this.navCtrl.push("LoginPage");
    }else{
      var message   = (this.translate.currentLang == 'en') ? 'Do you want to exit the application ?' : 'هل تريد الخروج من التطبيق ؟';
      var cansel    = (this.translate.currentLang == 'en') ? 'cansel' : 'إلغاء';
      var ok        = (this.translate.currentLang == 'en') ? 'ok' : 'موافق';
      const confirm = this.alertCtrl.create({
        message: message,
        buttons: [
          {
            text: ok,
            handler: () => {
              this.event.publish('user_is_out',{name : '', image : 'assets/imgs/image.png'});
              localStorage.removeItem('hdaaeq_provider_Data');
              this.navCtrl.push("LoginPage");
              // this.event.publish('user_logout');
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

}

