import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';

const backToLogin=()=> redirectUnauthorizedTo(['/login']);
const redirectLoged=()=>redirectLoggedInTo(['/feed']);
const routes: Routes = [
  {path: '',redirectTo: 'loader',pathMatch: 'full'},
  {path: 'loader',loadChildren: () => import('./pages/loader/loader.module').then( m => m.LoaderPageModule)},
  { path: 'login',loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),},
  {path: 'signup',loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule),},
  {path: 'news',loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule),},
  {path: 'chat',loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule),},
  {path: 'profile',loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),},
  {path: 'feed',loadChildren: () => import('./pages/feed/feed.module').then( m => m.FeedPageModule),},
  {path: 'weather',loadChildren: () => import('./pages/weather/weather.module').then( m => m.WeatherPageModule),}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
