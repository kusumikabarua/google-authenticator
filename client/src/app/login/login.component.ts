import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthGoogleService } from '../services/auth-google.service';
import { AuthService } from '../services/auth.service';

const MODULES: any[] = [MatFormFieldModule, FormsModule, ReactiveFormsModule];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MODULES],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private authGoogleService = inject(AuthGoogleService);
  private authService = inject(AuthService)
 
  signInWithGoogle() {
    
    this.authGoogleService.login();
    
   // this.authService.login("kusumikabarua@gmail.com","admin");
  
  }
}