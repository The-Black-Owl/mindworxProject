import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Chat', url: '/folder/Inbox', icon: 'chatbubble' },
    { title: 'Community chat', url: '/folder/Favorites', icon: 'chatbubbles' },
    { title: 'News', url: '/folder/Archived', icon: 'newspaper' },
    { title: 'Weather', url: '/folder/Archived', icon: 'thunderstorm' },
    { title: 'Mindworx Learn', url: '/folder/Archived', icon: 'school' }
  ];
  constructor() {}
}
