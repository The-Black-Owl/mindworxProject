import { Component, OnInit,ViewChild } from '@angular/core';
import {IonContent} from '@ionic/angular';
import {Observable, of,combineLatest} from 'rxjs';
import {switchMap,startWith,tap,map} from 'rxjs/operators';
import {FormControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { ProfileUser } from 'src/app/models/user';
import { Chat } from 'src/app/models/chat';
import { ChatserviceService } from 'src/app/services/chatservice.service';




@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content:IonContent;

  showContacts=false;
  showMessages=true;

  user$=this.usersService.currentUserProfile$;
  searchControl=new FormControl('');
  chatListControl=new FormControl();

  users$=combineLatest([this.usersService.allUsers$,this.user$,this.searchControl.valueChanges.pipe(
    startWith(''))]).pipe(
      map(([users,user,searchString])=>users.filter(u=>u.displayName?.toLowerCase().includes(searchString.toLowerCase()
      )&& u.uid !== user?.uid))
    );

  constructor(private usersService:UsersService,
    private chatService:ChatserviceService) { }

  ngOnInit():void {
  }

  myChats$ =  this.chatService.myChats$;

selectedChats$=combineLatest([
    this.chatListControl.valueChanges,
    this.myChats$,
  ]).pipe(
    map(([value,chats])=> chats.find(c=> c.id=== value[0]))
  );

  goToChats(){
    this.showContacts=!this.showContacts;
  }

  goToChat(chats: Chat){
    this.chatListControl.setValue(chats.id);
    console.log(this.chatListControl);
    console.log(this.selectedChats$);
  }

  createChat(otherUser:ProfileUser){
    this.chatService.createChat(otherUser).subscribe();
    this.showContacts=!this.showContacts;
    ;
  }
}
