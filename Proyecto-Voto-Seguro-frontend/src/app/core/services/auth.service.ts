import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginDto, RegisterDto, User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const token = this.getToken();
    const user = token ? this.getUserFromToken(token) : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  register(data: RegisterDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/Auth/register`, data)
      .pipe(
        tap(response => this.handleAuthResponse(response))
      );
  }

  login(data: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/Auth/login`, data)
      .pipe(
        tap(response => this.handleAuthResponse(response))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);
      const expirationDate = decoded.exp * 1000;
      return Date.now() < expirationDate;
    } catch {
      return false;
    }
  }

  getUserRole(): string | null {
    const user = this.currentUserValue;
    return user ? user.Role : null;
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  isUser(): boolean {
    return this.getUserRole() === 'user';
  }

  private handleAuthResponse(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    const user = this.getUserFromToken(response.token);
    this.currentUserSubject.next(user);
  }

  private getUserFromToken(token: string): User | null {
    try {
      const decoded: any = jwtDecode(token);
      return {
        Id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
        Email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        Fullname: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        Role: decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
        CreatedAt: new Date(),
        IsActive: true
      };
    } catch {
      return null;
    }
  }
}
