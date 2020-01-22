import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, Events, IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

declare var google;
@IonicPage()
@Component({
    selector: 'page-location',
    templateUrl: 'location.html',
})
export class LocationPage {
    @ViewChild('map') mapElement
    map: any;
    model:any={city:""}
    lat;
    lng;
    user;
    latout : any = 24.774265;
    lngout : any = 46.738586;
    constructor(
        public navCtrl       : NavController,
        public navParams     : NavParams,
        public event         : Events,
        public plt           : Platform,
        public viewCtrl      : ViewController,
        private geolocation  : Geolocation) {


    }

    ionViewWillEnter(){

        localStorage.setItem('hdaaeq_map_lat',this.latout)
        localStorage.setItem('hdaaeq_map_lng',this.lngout)

        this.geolocation.getCurrentPosition().then((resp) => {

            setTimeout(() => {
                this.initMap();
            }, 2000);

            this.latout   =  resp.coords.latitude;
            this.lngout   =  resp.coords.longitude;

        }).catch((error) => {
            this.initMap();
        });

        this.user    = JSON.parse(localStorage.getItem('hdaaeq_provider_Data'));

        if(this.user == null)
        {
            this.lat = this.latout;
            this.lng = this.lngout;
        }else{
            this.lat = JSON.parse(localStorage.getItem("hdaaeq_map_lat"));
            this.lng = JSON.parse(localStorage.getItem("hdaaeq_map_lng"))
        }

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LocationPage');
        this.initMap();
    }

    initMap(){

        var uluru = {lat:this.latout, lng: this.lngout};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 18,
            center: uluru,
            mapTypeId: google.maps.MapTypeId.roadmap, scaleControl: true,
        });


        var input = document.getElementById('search');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        var contentString =
            '<div id="content">'+
            '<p></p>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        var image = 'assets/imgs/map.png';


        var marker = new google.maps.Marker({
            position: {lat: this.latout, lng: this.lngout},
            map: map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            title: 'Hello site',
            icon: image,
            label: {
                color: 'white',
                fontSize: '12px'
            }
        });


        var google_maps_geocoder = new google.maps.Geocoder();
        google_maps_geocoder.geocode(
            {'latLng': marker.getPosition()},
            ( results, status) => {
                if (results[0]){
                    var add = results[0].formatted_address;
                    localStorage.setItem('hdaaeq_map_address',JSON.stringify(add))
                }

            }
        );


        var geocoder = new google.maps.Geocoder();

        google.maps.event.addListener(marker, 'dragend', function() {

            geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var add = results[0].formatted_address;
                        localStorage.setItem('hdaaeq_map_address',JSON.stringify(add))
                        infowindow.setContent(results[0].formatted_address);
                        infowindow.open(map, marker);
                    }
                }
            }.bind(this));
        }.bind(this));

    }

    dismiss() {
        let data = this.model.city
        this.viewCtrl.dismiss(data);
        console.log(data);
    }

}
