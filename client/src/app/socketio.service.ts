import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from './environment';
@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket:any;
  constructor() {   }
  setupSocketConnection( email:string) {
    this.socket =  io(environment.SOCKET_ENDPOINT, {
      auth: {
        token: email
      }
    });
    this.socket.emit('my message', 'Hello there from Angular.');
    this.socket.on('my broadcast', (data: string) => {
      console.log(data);
    
    });
    this.socket.on('New User Registered', (data: string) => {
      console.log(data);
      location.reload();
    });
  }
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}