import { Injectable } from '@angular/core';
import { Http, ResponseContentType, RequestMethod, Response, Request, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MapsService {
    public options: RequestOptions;
    public googleMapKey: string = '&key=AIzaSyC5lQ_gp4v2XW3KTONULU5doLbU-C5g4hI';
    public uri: string = 'https://maps.googleapis.com/maps/api/geocode/json?';
    constructor(public http: Http) {
    }

    getmapsCoordinate(address: string){
       
        //let uri = 'https://maps.googleapis.com/maps/api/geocode/json?address=Torun&components=administrative_area:TX|country:US&key=AIzaSyC5lQ_gp4v2XW3KTONULU5doLbU-C5g4hI';
        let uri = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyC5lQ_gp4v2XW3KTONULU5doLbU-C5g4hI';
        // return this.http.get(uri).map((response:Response) => response.json())
        //     .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        return this.http.get(uri).map(this.extractData);
           
        // return this.http.get(uri) 
        //    .map(response => (<Response>response));
        
    }
    private extractData(res: Response) {
        return res.json();
    }
}