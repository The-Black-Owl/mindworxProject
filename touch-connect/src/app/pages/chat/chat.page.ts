import { Component, OnInit,ViewChild } from '@angular/core';
import {IonContent} from '@ionic/angular';
import {Observable} from 'rxjs';
import { ChatserviceService } from 'src/app/services/chatservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content:IonContent;

  messages: Observable<any>;
  newMsg='';

  constructor(private chatService:ChatserviceService, private router:Router) { }

  ngOnInit() {
    this.chatService.getChatMessages();
  }

  sendMessage(){
    this.chatService.addChatMessage(this.newMsg).then(()=>{
      this.newMsg='';
      this.content.scrollToBottom();
    })
  }
}
