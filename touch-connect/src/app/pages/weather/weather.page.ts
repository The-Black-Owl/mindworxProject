import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

const WeathAPI=environment.WeathAPI;
const WeathURL=environment.WeathURL;
const GeoURL=environment.GeoURL;

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  longitud:any
  latitude:any
  weatherTemp:any
  cityName:any
  todayDate= new Date()//gets todays date
  constructor(public httpClient:HttpClient) { 
    this.loadData();
  }

  ngOnInit() {
  }
  loadData(){
   //gets the logitude and latitude of the location of interest
    this.httpClient.get(`${GeoURL}/direct?q=${'durban'}&appid=${WeathAPI}`).subscribe(results=>{
      console.log(results)
      this.latitude=results[0]['lat']
      this.longitud=results[0]['lon']

      this.cityName=results[0]['name']
      console.log(this.cityName);
    //gets the weather of that location
    this.httpClient.get(`${WeathURL}/weather?lat=${this.latitude}&lon=${this.longitud}&appid=${WeathAPI}`).subscribe(results=>{
      console.log(results)
      //the main is an array and unde rthe main array we have the temp
      this.weatherTemp=results['main']['temp']
      console.log(this.weatherTemp) });
    })
  }
}
