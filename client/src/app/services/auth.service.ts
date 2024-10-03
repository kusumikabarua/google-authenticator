import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  username: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, role: string): void {
    // For demo purposes, assume authentication is successful.
    const user: User = {
      username: username,
      roles: role === 'admin' ? ['admin', 'user'] : ['user'],
    };
    console.log("O",user);
    this.currentUserSubject.next(user);
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public isAuthorized(allowedRoles: string[]): boolean {

    const user = this.currentUserValue;
    console.log("1",user);
    if (!user) return false;
    return user.roles.some(role => allowedRoles.includes(role));
  }
}