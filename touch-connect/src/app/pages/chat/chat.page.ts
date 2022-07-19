import { Component, OnInit,ViewChild } from '@angular/core';
import {IonContent} from '@ionic/angular';
import {Observable, of,combineLatest} from 'rxjs';
import {switchMap,startWith,tap,map} from 'rxjs/operators';
import {FormControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { ProfileUser } from 'src/app/models/user';
import { ChatserviceService } from 'src/app/services/chatservice.service';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content:IonContent;

  user$=this.usersService.currentUserProfile$;
  searchControl=new FormControl('');

  users$=combineLatest([this.usersService.allUsers$,this.user$,this.searchControl.valueChanges.pipe(
    startWith(''))]).pipe(
      map(([users,user,searchString])=>users.filter(u=>u.displayName?.toLowerCase().includes(searchString.toLowerCase()
      )&& u.uid !== user?.uid))
    );

  constructor(private usersService:UsersService,
    private chatService:ChatserviceService) { }

  ngOnInit() {
  }

  createChat(otherUser:ProfileUser){
    this.chatService.createChat(otherUser).subscribe();
  }
}
