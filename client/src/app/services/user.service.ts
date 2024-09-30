import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import User from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   apiUrl = "http://localhost:4000";
   httpClient =inject(HttpClient);

  constructor() { }
  getUsers(){
    return this.httpClient.get<User[]>(this.apiUrl+'/users');
  }
  addUser(model:User){
    return this.httpClient.post(this.apiUrl+'/auth/register',model)
  }
}
