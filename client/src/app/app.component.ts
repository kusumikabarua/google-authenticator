import { Component ,OnInit} from '@angular/core';
;
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
//import { SocketioService } from './socketio.service';

const MODULES = [
  CommonModule,
  RouterOutlet,
  LoginComponent,
  DashboardComponent,
  MatToolbarModule
];
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MODULES],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
// export class AppComponent  implements OnInit{
//   title = 'socketio-angular';
//   constructor(private socketService: SocketioService) {}
//   ngOnInit() {
//     this.socketService.setupSocketConnection();
//   }
//   ngOnDestroy() {
//     this.socketService.disconnect();
//   }
// }
export class AppComponent{}