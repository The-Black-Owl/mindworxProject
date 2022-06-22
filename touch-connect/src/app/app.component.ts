import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: 'feed', icon: 'home' },
    { title: 'Profile', url: 'profile', icon: 'person' },
    { title: 'chat', url: 'chat', icon: 'chatbubbles' },
    { title: 'Mindworx News', url: 'news', icon: 'newspaper' },
    { title: 'Mindworx Academy', url: 'news', icon: 'school' },
    { title: 'Logout', url: 'login', icon: 'exit' }
  ];
  constructor() {}
}
