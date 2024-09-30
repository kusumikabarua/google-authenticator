import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGoogleService } from '../services/auth-google.service';
import { CommonModule } from '@angular/common';
import User from '../models/user';
import { UserService } from '../services/user.service';
const MODULES = [CommonModule];
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MODULES,MatTableModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthGoogleService);
  private router = inject(Router);
  profile: any;
  userObject:any;
  private userService = inject(UserService);
  displayedColumns: string[] = [ 'name', 'email'];
  datasource :User[]=[];
  ngOnInit(): void {
    this.showData();
    this.userService.getUsers().subscribe((result) => {
      this.userObject = result;
      console.log(this.userObject.users);
      this.datasource=this.userObject.users;
    });

  
  }

  showData() {
    this.profile = this.authService.getProfile();
    console.log(this.profile);
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
