import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup} from '@angular/forms';

import {untilDestroyed, UntilDestroy} from '@ngneat/until-destroy';

import {concatMap, switchMap,tap} from 'rxjs/operators';
import { ProfileUser } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ImageUploadService } from 'src/app/services/image-upload.service';
import { UsersService } from 'src/app/services/users.service';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user$=this.authService.currentUser$;

  profileForm= new FormGroup({
    uid: new FormControl(''),
    displayName: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    email: new FormControl(''),
  });


  constructor(private authService:AuthService,
    private imageUploadService:ImageUploadService,
    private usersService:UsersService) { }

  ngOnInit(): void {
    this.usersService.currentUserProfile$.pipe(untilDestroyed(this)).subscribe((user)=>{
      this.profileForm.patchValue({...user});
    });
  }

  uploadFile(event: any, {uid}:ProfileUser){
    this.imageUploadService.uploadImage(event.target.files[0],`images/profile/${uid}`).pipe(
      concatMap((photoURL)=>this.authService.updateProfileData({photoURL}))).subscribe();
  }

  saveProfile(){
    const profileData=this.profileForm.value;
    this.usersService.updateUser(profileData).subscribe();
  }
}
