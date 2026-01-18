import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<string | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Chequea si el usuario estaba previamente logueado, y si es así, logueamos automáticamente
  constructor(private router: Router) {
    const storedAuth = localStorage.getItem('is_admin_logged_in');
    const storedUser = localStorage.getItem('admin_user_email');
    
    if (storedAuth === 'true') {
      this.isLoggedInSubject.next(true);
      if (storedUser) {
        this.currentUserSubject.next(storedUser);
      }
    }
  }

  login(email: string, password: string): boolean {
    if (email === 'master@lemoncode.net' && password === '12345678') {
      this.isLoggedInSubject.next(true);
      this.currentUserSubject.next(email);
      localStorage.setItem('is_admin_logged_in', 'true');
      localStorage.setItem('admin_user_email', email);
      this.router.navigate(['/admin']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    this.currentUserSubject.next(null);
    localStorage.removeItem('is_admin_logged_in');
    localStorage.removeItem('admin_user_email');
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getCurrentUser(): string | null {
    return this.currentUserSubject.value;
  }
}
