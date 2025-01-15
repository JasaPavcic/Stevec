import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private username: string | null = null;

  setUsername(username: string): void {
    this.username = username;
  }

  getUsername(): string | null {
    return this.username;
  }

  createUser(username: string): User {
      const newUser : User = {
        username: username,
        timeSpent: {
          page1 : 0,
          page2: 0,
          page3 : 0
        }
      };
      return newUser;
    }

  saveUser(user: User): void {
    localStorage.setItem(user.username, JSON.stringify(user));
  }

  getUser(username : string) : User | null {
    const userJson = localStorage.getItem(username);
    return userJson ? JSON.parse(userJson) : null;
  }

  clearUser(user : User): void {
    localStorage.removeItem(user.username);
  }
}
