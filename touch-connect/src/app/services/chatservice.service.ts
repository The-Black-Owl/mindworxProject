import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {updateDoc,serverTimestamp} from 'firebase/firestore';
import { Router } from '@angular/router';
import{Observable,of} from 'rxjs';
import{switchMap,first,map} from 'rxjs/operators';
import { AuthService } from './auth.service';

export interface User{
  uid:string;
  email:string;
}

export interface Message{
  createdAt: string;
  id:string;
  from:string;
  msg:string;
  fromName:string;
  myMsg:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {
  currentUser: User=null;

  constructor(private auth: AngularFireAuth,
    private angularfirestore:AngularFirestore,
    private router: Router,
    private authService: AuthService) { }

  addChatMessage(msg){
   return this.angularfirestore.collection('messages').add({
    msg:msg,
    from: this.currentUser.uid,
    createdAt: serverTimestamp()
   });
  }

  getChatMessages(){
    let users=[];
    return this.getUsers().pipe(
      switchMap(res=>{
        users=res;
        return this.angularfirestore.collection('messages', ref=> ref.orderBy('createdAt')).valueChanges({
          idField:'id'
        }) as Observable<Message[]>;}),
        map(messages=>{
          for(let m of messages){
            m.fromName=this.getUserForMsg(m.from,users);
            m.myMsg=this.currentUser.uid===m.from;
          }
          return messages;
        })
    )
  }

  private getUsers(){
    return this.angularfirestore.collection('user').valueChanges({idField:'uid'})as Observable<User[]>;
  }

  private getUserForMsg(msgFromId,users:User[]): string{
    for(let usr of users){
      if(usr.uid==msgFromId){
        return usr.email;
      }
    }
    return 'deleted';
  }
}
