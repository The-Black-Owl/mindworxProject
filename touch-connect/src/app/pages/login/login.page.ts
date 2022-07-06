import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController,LoadingController} from '@ionic/angular';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginPageForm } from './login.page.form';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form:FormGroup;
  email: string="";
  password: string="";

  constructor(private menuCtrl: MenuController,
    private router: Router,
    private formBuilder: FormBuilder,
    private authService:AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController) {
  }

  ngOnInit() {
    this.form=new LoginPageForm(this.formBuilder).createForm();
  }

  /*this method is used to hide the menu during the log in phase of the application*/
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
 }
  async logIn(){
    const loading= await this.loadingController.create();
    await loading.present();

    this.authService.login(this.email,this.password).then(()=>{
      loading.dismiss();
      this.email='';
      this.password='';
      this.menuCtrl.enable(true);
      this.router.navigateByUrl('/feed',{replaceUrl:true});
    }, async (err)=>{
      loading.dismiss();
      const alert=await this.alertController.create({
        header:':/',
        message: err.message,
        buttons:['OK'],
      });
      await alert.present();
    });
  }

//thimethod takes us to the signup page
  forgotPass(){
    this.authService.recovery(this.email);
    this.email='';
  }

// this method takes us to the signup page
  register(){
    this.router.navigate(['signup']);
  }
}
