import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {  AlertController,LoadingController} from '@ionic/angular';

import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form:FormGroup;
  name: string="";
  email: string="";
  password:string="";
  confirm_password: string="";

  constructor(private authService:AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController) { }
  ngOnInit() {
  }
  async signUp(){
    const loading= await this.loadingController.create();
    await loading.present();

    this.authService.register(this.email,this.password,this.name).then((user)=>{
      if(this.password==this.confirm_password){
        loading.dismiss();
        this.router.navigateByUrl('/login',{replaceUrl:true});
      }else{err=>{
        loading.dismiss();
        this.router.navigateByUrl('/signup',{replaceUrl:true});
        alert('password dont match')
      }}
    },async (err)=>{
      loading.dismiss();
      const alert= await this.alertController.create({
        header: 'failed to signup',
        message: err.message,
        buttons:['OK'],
      });
      await alert.present();
    })
  }
}
