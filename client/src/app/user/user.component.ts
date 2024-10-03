import { Component, OnInit, inject } from '@angular/core';

import { Router } from '@angular/router';
import { AuthGoogleService } from '../services/auth-google.service';
import { AuthService } from '../services/auth.service';
import User from '../models/user';
import { UserService } from '../services/user.service';
import { SocketioService } from '../socketio.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  private googleAuthService = inject(AuthGoogleService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private socketService = inject(SocketioService);
  profile: any;
  user:any;
  ngOnInit(): void {
    this.register();
   
  }
  register() {
    this.profile =  this.googleAuthService.getProfile();
    console.log(this.profile);
    if(this.profile){
      this.socketService.setupSocketConnection(this.profile.email);
      const model:User = {name:this.profile.name,email:this.profile.email,googleProfileId:this.profile.aud,role:"user",id:0,password:""}
      this.userService.addUser(model).subscribe((result) => {
         let resultArray = Object.values(result);
        console.log(resultArray[0]);
        console.log(resultArray[1]);

        this.user = resultArray[1];
        this.login();
      });
    }else{
      location.reload();
    }
    
  }
  logOut() {
    this.googleAuthService.logout();
    this.router.navigate(['/login']);
  }
  login(){
    console.log("login");
    if(this.user){
      console.log("this.user.email",this.user.email);
      console.log("this.user.role",this.user.role);
      this.authService.login(this.user.email,this.user.role);
      this.router.navigate(['/admin']);
    }
   

   
  }
}
