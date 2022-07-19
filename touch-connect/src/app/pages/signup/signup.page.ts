import { Component, OnInit } from '@angular/core';
import {FormGroup,
        AbstractControl,
        FormControl,
        ValidationErrors,
        ValidatorFn,
        Validators,} from '@angular/forms';
import {forkJoin} from 'rxjs';
import {switchMap} from 'rxjs/operators'
import { Router } from '@angular/router';
import {  AlertController,LoadingController} from '@ionic/angular';

import { AuthService } from 'src/app/services/auth.service';
import { ProfileUser } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

//function to check if passwords match

export function passwordMatchValidator(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null =>{
    const password= control.get('password')?.value;
    const confirm_password= control.get('confirm_password')?.value;

    if(password && confirm_password && password !== confirm_password){
      return{ passwordsDontMatch:true};
    }else{
      return null;
    }
  };
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  //sign up form

  signUpForm=new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(6)]),
    confirm_password: new FormControl('',[Validators.required,Validators.minLength(6)]),
  },{validators:passwordMatchValidator()}
  );

  constructor( private authService:AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private usersService: UsersService,) { }

  ngOnInit() {}

  get email(){
    return this.signUpForm.get('email');
  }
  get password(){
    return this.signUpForm.get('password');
  }
  get confirm_password(){
    return this.signUpForm.get('confirm_password');
  }
  get name(){
    return this.signUpForm.get('name');
  }



  async signUp(){
    const loading= await this.loadingController.create();
    if(!this.signUpForm.valid){
      return;
    }

    await loading.present();
    const {name,email,password}=this.signUpForm.value;
    this.authService.register(email,password).pipe(
      switchMap(({user:{uid}}) => this.usersService.addUser({uid,email,displayName:name}))
    ).subscribe(()=>{
      loading.dismiss(),
      this.router.navigateByUrl('/login',{replaceUrl:true})
    })
  }

}
