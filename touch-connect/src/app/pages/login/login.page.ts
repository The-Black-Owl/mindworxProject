import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  emali: string="";
  password: string="";

  constructor(private menuCtrl: MenuController) {
  }// importetd the menucontroller, 
  //need to disable menu when log in is open, enab;le when login is closed

  ngOnInit() {
  }
  /*this method is used to hide the menu during the log in phase of the application
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
 }*/
  logIn(){
    this.emali+','+this.password;//outputs  a comma separated string of email and password
    //this.menuCtrl.enable(true);//enables the application menu
  }
}
