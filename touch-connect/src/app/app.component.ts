import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  user$=this.authService.currentUser$;

  public appPages = [
    { title: 'Home', url: 'feed', icon: 'home' },
    { title: 'Profile', url: 'profile', icon: 'person' },
    { title: 'chat', url: 'chat', icon: 'chatbubbles' },
    { title: 'Mindworx News', url: 'news', icon: 'newspaper' },
    { title: 'Weather', url: 'weather', icon: 'cloud' },
    { title: 'Mindworx Academy', url: 'news', icon: 'school' },
  ];

  constructor(
    private authService:AuthService,
    private usresService:UsersService,
    private router:Router
  ) {}

}
