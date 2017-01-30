import { Component } from '@angular/core';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MapsService } from './maps.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor( public mapsService :MapsService) {

  }
  title = 'My first angular2-google-maps project';
  lat: number = 51.678418;
  lng: number = 7.809007;
  address: string = "mycos"; 
  zoom: number = 14;
  location: string;
  street_address: string;
  country: string;
  detail: string;

  ngOnInit(){
    this.search();
  }
  search(){
    this.mapsService.getmapsCoordinate(this.address).subscribe(
        x => {
          console.log("VALUE RECEIVED: ",x);
          console.log(JSON.stringify(x));
          let data = x;
          console.log(data.results[0].geometry.location.lat);
          this.lat = data.results[0].geometry.location.lat;
          this.lng = data.results[0].geometry.location.lng;
          this.detail = data.results[0].formatted_address;
        }
    );
   
  }
}
