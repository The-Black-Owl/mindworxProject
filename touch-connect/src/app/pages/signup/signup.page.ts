import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  name: string="";
  email: string="";
  password:string="";

  constructor(public menuCtrl: MenuController) { }
  ngOnInit() {
  }
  ionViewWillEnter() {
      this.menuCtrl.enable(false);
  }
  signUp(){
    this.name+','+this.email+','+this.password;
    this.menuCtrl.enable(true);
  }
}
