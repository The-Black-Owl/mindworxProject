import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {provideFirestore,getFirestore}from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import {getStorage,provideStorage} from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import {AutoCompleteModule} from 'ionic4-auto-complete';

@NgModule({
  declarations: [AppComponent, LoadingComponent],
  imports: [BrowserModule,
    IonicModule.forRoot(),
     AppRoutingModule,
     HttpClientModule,
     provideFirebaseApp(() => initializeApp(environment.firebase)),
     provideAuth(() => getAuth()),
     provideFirestore(()=>getFirestore()),
     provideStorage(()=>getStorage()),
     AutoCompleteModule,
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
