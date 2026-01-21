import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly KEY = 'xyz_logged_in';

  // 🔐 Mock login
  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem(this.KEY, 'true');
      return true;
    }
    return false;
  }

  // 🔓 Logout (state only)
  logout(): void {
    localStorage.removeItem(this.KEY);
  }

  // 🔍 Auth check
  isLoggedIn(): boolean {
    return localStorage.getItem(this.KEY) === 'true';
  }
}
