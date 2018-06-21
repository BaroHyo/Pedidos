import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
@Injectable()
export class GeolocalizacionServicio {
  constructor( private geolocation:Geolocation ) {
  }
  get (){
    return this.geolocation.getCurrentPosition();
  }
}
