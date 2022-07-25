import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';

const WeathAPI=environment.WeathAPI;
const WeathURL=environment.WeathURL;
const GeoURL=environment.GeoURL;

const TimeURL=environment.TimeURL;
const TimeAPI=environment.TimeAPI;

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  longitud:any
  latitude:any
  weatherTemp:any //temp of the day
  minTemp:any
  maxTemp:any
  humidity:any
  weatherIcontype:any
  weatherIcon:any
  cityName="" // city name

  todayDate= new Date()//gets todays date

  abbreviation:any
  countryName:any
  timeFormat:any
  regionName:any
  zoneName:any

  loadingInfo=true
  constructor(public httpClient:HttpClient) {

  }

  ngOnInit() {
    this.loadData();
  }
  loadData(){
   //gets the logitude and latitude of the location of interest
    this.httpClient.get(`${GeoURL}/direct?q=${this.cityName}&appid=${WeathAPI}`).subscribe(results=>{
      console.log(results)
      this.latitude=results[0]['lat']
      this.longitud=results[0]['lon']

      this.httpClient.get(`${TimeURL}/get-time-zone?key=SGPYMGN0FYYZ&format=json&by=position&lat=${this.latitude}&lng=${this.longitud}
    `).subscribe(results=>{
      console.log(results)
      this.abbreviation=results['abbreviation']
      this.countryName=results['countryName']
      this.timeFormat=results['formatted']
      this.zoneName=results['zoneName']
      this.regionName=results['regionName']
      console.log(this.abbreviation,this.countryName,this.timeFormat,this.zoneName,this.regionName)});

    //gets the weather of that location, converts the weather into celcius
    this.httpClient.get(`${WeathURL}/weather?lat=${this.latitude}&lon=${this.longitud}&appid=${WeathAPI}&units=metric`).subscribe(results=>{
      console.log(results)
      //the temperatures havce been rounded up
      this.weatherTemp=Math.round(results['main']['temp'])
      this.minTemp=Math.round(results['main']['temp_min'])
      this.maxTemp=Math.round(results['main']['temp_max'])
      this.humidity=results['main']['humidity']
      //allows us to have the icons of the weather
      this.weatherIcontype=results['weather'][0]['icon']
      this.weatherIcon=`http://openweathermap.org/img/wn/${this.weatherIcontype}@2x.png`
      this.loadingInfo=false
      console.log(this.weatherTemp,this.minTemp,this.maxTemp,this.humidity,this.weatherIcon) });
    })
  }
}
