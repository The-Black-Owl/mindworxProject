import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  
})
export class LoadingComponent implements OnInit {

constructor(public loadingCtrl:LoadingController){}

  async presentLoading(){
    const loading= await this.loadingCtrl.create({
      cssClass:'backdrop',
      spinner:'crescent',
      duration:5000
    });
    await loading.present();

    const {role,data}=await loading.onDidDismiss();
    console.log('loading dismissed',role);
  }


  ngOnInit() {
    this.presentLoading();
  }

}
