import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController, Platform, ToastController } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';

import {ApiProvider} from "../../service/api/api";

declare var google;
@IonicPage()
@Component({
  selector: 'page-select-location',
  templateUrl: 'select-location.html',
})
export class SelectLocationPage {
  @ViewChild('map') mapElement
  map: any;
  model:any={address:"", lang:"",lat: "",lng:"",user_id: ""}
  user_id;
  constructor(
    public navCtrl      : NavController, 
    public navParams    : NavParams,
    public event        : Events,
    public plt          : Platform,
    public viewCtrl     : ViewController,
    public translate    : TranslateService,
    public api          : ApiProvider,
    public toastCtrl    : ToastController) {
  }

  ionViewDidLoad() {
    this.user_id = JSON.parse(localStorage.getItem('hdaaeq_provider_Data'));
    this.model.user_id   = this.user_id.id;
    this.model.lang      = this.translate.currentLang;
    
    this.initMap();
  }

  initMap(){

    this.plt.ready().then(() => {
        
        //get address from lat and lng
        var geocoder  = new google.maps.Geocoder();            
        var locations  = new google.maps.LatLng(localStorage.getItem('hdaaeq_default_lat'),
        localStorage.getItem('hdaaeq_default_lng'));
        localStorage.setItem('hdaaeq_map_lat',localStorage.getItem('hdaaeq_default_lat'))
        localStorage.setItem('hdaaeq_map_lng',localStorage.getItem('hdaaeq_default_lng'))
        geocoder.geocode({'latLng': locations}, (results, status) =>{
          if(status == google.maps.GeocoderStatus.OK) {
            var add=results[0].formatted_address;
            localStorage.setItem('hdaaeq_map_address',add)
            this.event.publish('hdaaeq_address_done')
          }
        });

        this.model.city = localStorage.getItem('hdaaeq_map_address')

        //show map
        var crosshairShape = {coords:[0,0,0,0],type:'rect'};
        const location = new google.maps.LatLng(localStorage.getItem('hdaaeq_default_lat'),
        localStorage.getItem('hdaaeq_default_lng'));
        const options = google.maps.MapOptions = {
          center: {lat: 30.0596185, lng: 31.1884236},
          zoom: 13,
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement,options);
        
        //end of show map

        //marker
        var marker = new google.maps.Marker({
          position: location,
          draggable: true,
          icon: 'assets/imgs/map.png',
          animation: 'DROP',
          shape: crosshairShape
        });
        marker.setMap(this.map);
        marker.bindTo('position', this.map, 'center'); // floating marker

          //get lat lng when moveing map
          google.maps.event.addListener(this.map, 'center_changed', () => {
          var location = this.map.getCenter();
          this.model.lat = location.lat();
          this.model.lng = location.lng();
          //get address from lat and lng
          var geocoder  = new google.maps.Geocoder();            
          var locations  = new google.maps.LatLng(location.lat(), location.lng());
          geocoder.geocode({'latLng': locations}, (results, status)=> {
            if(status == google.maps.GeocoderStatus.OK) {         
              var add=results[0].formatted_address;
              this.model.address = add;
              this.event.publish('hdaaeq_address_done')
            }
          })
        });
      
    })
  }

  dismiss() {
    this.api.editprofile(this.model).subscribe(
      (data: any) => {

        const toast = this.toastCtrl.create({
        message: data.message,
        duration: 3000
        });
        toast.present();
        if(data.key == "1"){
          localStorage.setItem('hdaaeq_provider_Data',JSON.stringify(data.data));
          this.navCtrl.push("EditProfilePage");
        }
    }, error =>{
      // loading.dismiss();
    },()=>{
      // loading.dismiss();
    });
  }

}
