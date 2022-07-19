import { Injectable } from '@angular/core';
import { collection, Firestore } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { concatMap, map, take } from 'rxjs/operators';
import { ProfileUser } from '../models/user';
import { UsersService } from './users.service';


@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {


  constructor(private firestore:Firestore, private userService:UsersService) { }

  createChat(otherUser:ProfileUser): Observable<string>{
    const ref=collection(this.firestore,'chats');
    return this.userService.currentUserProfile$.pipe(
      take(1),
      concatMap(user=>
        addDoc(ref,{
        userIds:[user?.uid,otherUser?.uid],
        users:[
          {
            displayName:user?.displayName ?? '',
            photURL: user?.photoURL ?? ''
          },
          {
            displayName:otherUser?.displayName ?? '',
            photURL: otherUser?.photoURL ?? ''
          },
        ]
      })),
      map(ref=>ref.id)
    );
  }
}
