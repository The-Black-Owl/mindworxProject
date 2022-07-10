import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController,LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';
import {FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm=new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)])
  });

  constructor(private menuCtrl: MenuController,
    private router: Router,
    private authService:AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController) {
  }

  ngOnInit() {
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  /*this method is used to hide the menu during the log in phase of the application*/
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
 }
  async logIn(){
    const loading= await this.loadingController.create();
    if(!this.loginForm.valid){
      return;
    }

    await loading.present();
    const {email,password}=this.loginForm.value;
    this.authService.login(email,password).subscribe(()=>{
      loading.dismiss();
      this.router.navigateByUrl('/feed',{replaceUrl:true});
      this.menuCtrl.enable(true);
    }, async err=>{
      loading.dismiss();
      const alert= await this.alertController.create({
        header: 'failed to login',
        message: err.message,
        buttons:['OK'],
      });
      await alert.present();
    });
  }

//this method is password recovery
  forgotPass(){
    const {email}=this.loginForm.value;
    this.authService.recovery(email);
  }

// this method takes us to the signup page
  register(){
    this.router.navigateByUrl('/signup');
  }
}
