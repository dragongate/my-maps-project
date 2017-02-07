import { Component } from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MapsService } from './maps.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

interface marker {
  lat: number;
  lng: number;
  detail: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  markers: marker[] = [];
  constructor(public mapsService: MapsService) {

  }
  title = 'angular2 Google maps';
  lat: number;
  lng: number;
  address: string;
  addresses: string[] = [
    "香港新界	西貢	曉嵐閣	3座5樓C室",
    "International Commerce Centre	1 Austin Road West	Kowloon, Hong Kong",
    "Rt.12	Rw.5, Kelurahan Krukut,	Kecamatan Taman Sari	Kotamadya Jakarta Barat, Indonesia",
    "Changqing Garden ,	Dongxihu District, Wuhan Hubei Province PRC",
    "Dubai	Dubai Internet City 12 #02-211	P O Box 502430, Dubai	United Arab Emirates"
  ];

  zoom: number = 8;


  optional_address: string;
  locality: string;
  street_address: string;
  route: string;
  country: string;
  post_box: string;
  postal_code: string;
  street_number: string;
  floor: string;
  room: string;

  detail: string;

  alert: boolean = false;

  ngOnInit() {
    this.search();
  }
  search() {

    this.addresses.forEach(data => {
      this.mapsService.getmapsCoordinate(data).subscribe(
        x => {
          console.log("VALUE RECEIVED: ", x);
          console.log(JSON.stringify(x));
          let data = x;
          if (data.status == "OK") {
            console.log(data.results[0].geometry.location.lat);
            this.markers.push({
              lat: data.results[0].geometry.location.lat,
              lng: data.results[0].geometry.location.lng,
              detail: data.results[0].formatted_address
            });
            this.lat = data.results[0].geometry.location.lat;
            this.lng = data.results[0].geometry.location.lng;
            this.detail = data.results[0].formatted_address;
            console.log(this.markers);
          }


        }
      );
    });


  }

  searchMore() {


    this.mapsService.getmapsCoordinate(this.address).subscribe(
      x => {
        console.log("VALUE RECEIVED: ", x);
        console.log(JSON.stringify(x));
        let data = x;
        if (data.status != "OK") {
          console.error("Search not found");
        }
        else {
          console.log(data.results[0].geometry.location.lat);

          this.markers.push({
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
            detail: data.results[0].formatted_address
          });
          this.lat = data.results[0].geometry.location.lat;
          this.lng = data.results[0].geometry.location.lng;
          this.detail = data.results[0].formatted_address;
          console.log("this.marker : " + this.markers);
          this.addresses.push(this.detail);
        }

      },
      error => {
        console.error("Search not found");
      }
    );

  }

  search_loop() {
    let status = "OK!";
    // while (status != "OK") {
    for (let i = 0; i < 4; i++) {
      let result = this.mapsService.getmapsCoordinate2(this.address);
      //this.mapsService.getmapsCoordinate2(this.address);
      console.log(JSON.stringify(result));
      console.log(result);
      result.then(data => {
        console.log(data.status);
      });
      // result._zone_symbol_value.status
      if (status == "OK!")
        break;
    }
  }

  search_optional() {
    if (this.address) {
      this.optional_address = this.address;
    }
    this.optional_address = this.optional_address + "&components=";
    if (this.country) {
      this.optional_address = "country:" + this.country;
    }
    if (this.route) {
      this.optional_address = this.optional_address + "|" + "route:" + this.route;
    }
    if (this.post_box) {
      this.optional_address = this.optional_address + "|" + "post_box:" + this.post_box;
    }
    if (this.street_address) {
      this.optional_address = this.optional_address + "|" + "street_address:" + this.street_address;
    }
    if (this.locality) {
      this.optional_address = this.optional_address + "|" + "locality:" + this.locality;
    }
    if (this.postal_code) {
      this.optional_address = this.optional_address + "|" + "postal_code:" + this.postal_code;
    }
    if (this.street_number) {
      this.optional_address = this.optional_address + "|" + "post_box:" + this.street_number;
    }
    if (this.floor) {
      this.optional_address = this.optional_address + "|" + "floor:" + this.floor;
    }
    if (this.room) {
      this.optional_address = this.optional_address + "|" + "room:" + this.room;
    }

    this.mapsService.getmapsCoordinate(this.optional_address).subscribe(
      x => {
        console.log("VALUE RECEIVED: ", x);
        console.log(JSON.stringify(x));
        let data = x;
        if (data.status != "OK") {
          console.error("Search not found");
        }
        else {
          console.log(data.results[0].geometry.location.lat);

          this.markers.push({
            lat: data.results[0].geometry.location.lat,
            lng: data.results[0].geometry.location.lng,
            detail: data.results[0].formatted_address
          });
          this.lat = data.results[0].geometry.location.lat;
          this.lng = data.results[0].geometry.location.lng;
          this.detail = data.results[0].formatted_address;
          console.log("this.marker : " + this.markers);
          this.addresses.push(this.detail);
        }
      }
    );

  }
}
