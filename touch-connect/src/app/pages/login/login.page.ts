import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginPageForm } from './login.page.form';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form:FormGroup;
  emali: string="";
  password: string="";

  constructor(private menuCtrl: MenuController, private router: Router,private formBuilder: FormBuilder) {
  }// importetd the menucontroller, 
  //need to disable menu when log in is open, enab;le when login is closed

  ngOnInit() {
    this.form=new LoginPageForm(this.formBuilder).createForm();
  }
  /*this method is used to hide the menu during the log in phase of the application*/
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
 }
  logIn(){
    this.emali+','+this.password;//outputs  a comma separated string of email and password
    this.menuCtrl.enable(true);//enables the application menu
    this.router.navigate(['feed']);
  }
  register(){
    this.router.navigate(['signup']);
  }
}
