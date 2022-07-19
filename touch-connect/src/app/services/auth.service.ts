import { Injectable } from '@angular/core';


import {Auth,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        sendPasswordResetEmail,
        authState,
        updateProfile,
        UserInfo,
        UserCredential,
        } from '@angular/fire/auth';
import{from, Observable,of} from 'rxjs';
import{switchMap,first,map, concatMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  currentUser$ = authState(this.auth)

  constructor(private auth:Auth) {}

  //login method
  login(email: string, password: string):Observable<any>{
    return from(signInWithEmailAndPassword(this.auth,email,password));
  }

  //Register method(sign up)
 register(email:string,password:string){
    return from(createUserWithEmailAndPassword(this.auth,email,password))
  }

  //updating user profile;
  updateProfileData(profileData: Partial<UserInfo>): Observable<any>{
    const user=this.auth.currentUser;
    return of(user).pipe(
      concatMap(user=>{
        if(!user) throw new Error('Not Authenticated');

        return updateProfile(user,profileData);
      })
    )
  }

  logout(): Observable<any> {
    return from(this.auth.signOut());
  }

  //forgot password
  recovery(email:string){
    sendPasswordResetEmail(this.auth,email);}
}
