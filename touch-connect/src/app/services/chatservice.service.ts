import { Injectable } from '@angular/core';
import { collection, Firestore, query,addDoc, where, collectionData,doc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { concatMap, map, take,switchMap } from 'rxjs/operators';
import { Chat } from '../models/chat';
import { ProfileUser } from '../models/user';
import { UsersService } from './users.service';


@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {


  constructor(private firestore:Firestore, private userService:UsersService) { }

  createChat(otherUser: ProfileUser): Observable<string> {
    const refs = (collection(this.firestore, 'chats'));
    return this.userService.currentUserProfile$.pipe(
      take(1),
      concatMap((user) =>
        addDoc(refs, {
          userIds: [user?.uid, otherUser?.uid],
          users: [
            {
              displayName: user?.displayName ?? '',
              photoURL: user?.photoURL ?? '',
            },
            {
              displayName: otherUser.displayName ?? '',
              photoURL: otherUser.photoURL ?? '',
            },
          ],
        })
      ),
    map((refs)=> refs.id)
    );
  }

  get myChats$():Observable<Chat[]>{
    const ref = collection(this.firestore,'chats');
    return this.userService.currentUserProfile$.pipe(
      concatMap((user)=>{
        const myQuery= query(ref,where('userIds','array-contains',user?.uid))
        return collectionData(myQuery,{idField:'id'}).pipe(
          map(chats => this.addChatNameAndPic(user?.uid ?? '',chats as Chat[]))
        ) as Observable<Chat[]>
      })
    )
  }

  addChatNameAndPic(curreUserId:string, chats: Chat[]):Chat[]{
    chats.forEach(chat =>{
      const otherIndex = chat.userIds.indexOf(curreUserId)=== 0 ?1 : 0;
      const {displayName,photoURL}=chat.users[otherIndex];
      chat.chatName=displayName;
      chat.chatPic=photoURL;
    })
    return chats;
  }
}
