import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import{Observable,of} from 'rxjs';
import{switchMap,first,map} from 'rxjs/operators';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$: Observable<any>;

  constructor(private auth: AngularFireAuth,private firestore:AngularFirestore, private router: Router) {
    this.user$=this.auth.authState.pipe(switchMap(user=>{
      if (user){
        return this.firestore.doc<any>(`users/${user.uid}`).valueChanges();
      }else{
        return of (null);
      }
    }))
  }

  getUser(){
    return this.user$.pipe(first()).toPromise();
  }

  //login method
  login(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }
  //Register method(sign up)
 async register(email:string,password:string,name:string){
    const credential= await this.auth.createUserWithEmailAndPassword(email,password);
    const uid= credential.user.uid;
    const username= name;
    return this.firestore.doc(
      `users/${uid}`
      ).set({
        uid,
        username,
        email:  credential.user.email})
  }


  //forgot password
  recovery(email:string){
    this.auth.sendPasswordResetEmail(email).then(()=>{
      this.router.navigate(['/login']);
    },err=>{
      alert('ooops...')
    })
  }
  //logout
  logout(){
    this.auth.signOut().then(()=>{
      localStorage.removeItem('token');
      this.router.navigate(['login']);
    },err=>{
      alert(err.message);
    })
  }
}
