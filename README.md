# mindworxProject
This repository contains the mindworx touch connect application. Developed using ionic
so far the app contains
>>loader{being styled}
>>login page-- made html changes
>>signup page--made html changes
>>forgot password page-- no change---removed

contains a navigator:<this has been removed a while back>
    >chat
    >community chat
    >news
    >weather
    >mindworx learn
    >login 

changes mad today:
>removed the feature to enable and disable menu on both the sign up and log in page
    ..problem is that when i navigate from the signup page to the log in the menu is disabled<good but not the aim>
    ..observation; what ionic does is that since the folder file which had the menu stuff has been desabled, by pulling on  the side the 
        this creates an automatic back to previous page feature by sliding.

>deleted the home page
>deleted the forgot password page
------ to do later
> make the home page
> remove the error being experienced on the sign up page, understanding how the push and pull features work
    ... changes to the signup page
        >add ion back button on the header of the signup html
        >remove the login button on the register page
        ...allow register page to allow for image upload
        ...bio update feature
> ensure that menu works

referring for the selection list

<ion-list
      inset
      [formControl]="chatListControl">
        <ion-item lines="inset"
        *ngFor="let chat of myChats$ | async"
        >
        <ion-avatar>
          <img [src]="chat.chatPic ? chat.chatPic:'/assets/profileICON.png'"/>
        </ion-avatar>
          <p class="chat-title">
            <span class="chat-name">{{chat?.chatName}}</span>
            <span>{{chat.lastMessageDate}}</span>
          </p>
          <p class="chat-date">{{chat.lastMessage}}</p>
        </ion-item>
      </ion-list>

message list
<div class="messages-header" *ngIf="selectedChats$ | async as selectedChat">
        <img [src]="selectedChat.chatPic ? selectedChat.chatPic : '/assets/profileICON.png'"/>
        <h2>{{selectedChat.chatName}}</h2>
</div>

for search
<ion-button
              *ngFor="let user of users$ |async"
              (click)="createChat(user)">{{user?.displayName}}</ion-button>