import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { MapsService } from './maps.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModule, AlertModule } from 'ng2-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC5lQ_gp4v2XW3KTONULU5doLbU-C5g4hI'
    }),
    NgbModule.forRoot()
  ],
  providers: [
    MapsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
