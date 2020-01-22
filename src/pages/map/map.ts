import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Platform, Events } from 'ionic-angular';

declare var google;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement
  map: any;
  lat;
  lng;
  constructor(
    public navCtrl      : NavController, 
    public navParams    : NavParams,
    public event        : Events,
    public plt          : Platform,
    public viewCtrl     : ViewController) {

      this.lat       = parseFloat(this.navParams.get('lat'));
      this.lng       = parseFloat(this.navParams.get('lng'));
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.initMap();
  }

  initMap(){

    this.plt.ready().then(() => {

        //show map
        var crosshairShape = {coords:[0,0,0,0],type:'rect'}; // floating marker
        const location = new google.maps.LatLng(this.lat,this.lng);
        const options = google.maps.MapOptions = {
          center: {lat: this.lat, lng: this.lng},
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
          localStorage.setItem('hdaaeq_map_lat',location.lat())
          localStorage.setItem('hdaaeq_map_lng',location.lng())
          //get address from lat and lng
          var geocoder   = new google.maps.Geocoder();            
          var locations  = new google.maps.LatLng(this.lat,this.lng);
          geocoder.geocode({'latLng': locations}, (results, status)=> {
            if(status == google.maps.GeocoderStatus.OK) {         
              var add=results[0].formatted_address;
              localStorage.setItem('hdaaeq_map_address',add)
              this.event.publish('hdaaeq_address_done')
            }
          })
        });
      
    })
  }

  goDone(){
    this.navCtrl.push("DonePage");
  }

}
