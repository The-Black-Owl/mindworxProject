import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {

  constructor(public loadingController: LoadingController, private router: Router) { }

  ngOnInit() {
    setTimeout(()=>{
      this.router.navigateByUrl('/login',{replaceUrl:true});
    },2000)
  }

}
