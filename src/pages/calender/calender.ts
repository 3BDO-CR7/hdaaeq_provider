import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-calender',
  templateUrl: 'calender.html',
})
export class CalenderPage {
  date:any = new Date();
  constructor(
    public navCtrl      : NavController, 
    public navParams    : NavParams,
    public viewCtrl     : ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalenderPage');
    console.log(this.date)
  }

  onDaySelect(event){
    this.date = event;
    this.viewCtrl.dismiss(event);
  }


}
