import { Injectable } from '@angular/core';
import {collection,
  collectionData,
        doc,
        docData,
        Firestore,
        query,
        getDoc,
        setDoc,
        updateDoc} from '@angular/fire/firestore';
import{from,Observable,of}from 'rxjs';
import{switchMap}from 'rxjs/operators';

import { ProfileUser } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore:Firestore, private authService:AuthService) { }

  get currentUserProfile$():Observable<ProfileUser|null>{
    return this.authService.currentUser$.pipe(
      switchMap((user)=>{
        if(!user?.uid){
          return of(null);
        }
        const ref= doc(this.firestore,'users',user?.uid);
        return docData(ref) as Observable<ProfileUser>;
      })
    );
  }
//for chat page
  get allUsers$(): Observable<ProfileUser[]> {
    const ref = collection(this.firestore, 'users');
    const queryAll = query(ref);
    return collectionData(queryAll) as Observable<ProfileUser[]>;
  }

  addUser(user:ProfileUser): Observable<any>{
    const ref=doc(this.firestore,'users',user?.uid);
    return from(setDoc(ref,user));
  }

  updateUser(user:ProfileUser):Observable<any>{
    const ref= doc(this.firestore,'users',user?.uid);
    return from(updateDoc(ref,{...user}));
  }

}
