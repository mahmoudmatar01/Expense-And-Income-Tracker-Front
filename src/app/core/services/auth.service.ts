import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TokenService } from './token.service';
import { AuthResponse } from '../interfaces/AuthResponse';
import { RegisterRequest } from '../interfaces/RegisterRequest';
import { LoginRequest } from '../interfaces/LoginRequest';
import { UserRole, User } from '../interfaces/user';
import { environment } from '../interfaces/environment';

// Re-export so other files can import from auth.service
export { UserRole } from '../interfaces/user';
export type { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly API = `${environment.apiBaseUrl}/auth`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }


  register(data: RegisterRequest): Observable<string> {
    return this.http.post(`${this.API}/register`, data, { responseType: 'text' });
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const body: LoginRequest = { email, password };
    return this.http.post<AuthResponse>(`${this.API}/login`, body)
      .pipe(
        tap(res => {
          if (res.success && res.data) {
            this.tokenService.saveTokens(
              res.data.accessToken,
              res.data.refreshToken
            );
            this.tokenService.saveRole(res.data.role);
          }
        })
      );
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.tokenService.getRefreshToken();
    return this.http.post<AuthResponse>(`${this.API}/refresh`, { refreshToken })
      .pipe(
        tap(res => {
          if (res.success && res.data) {
            this.tokenService.saveTokens(
              res.data.accessToken,
              res.data.refreshToken
            );
            this.tokenService.saveRole(res.data.role);
          }
        })
      );
  }

  logout(): void {
    // Fire-and-forget the server logout, then clear local state
    this.http.post(`${this.API}/logout`, {}, { responseType: 'text' }).subscribe({
      error: () => { }
    });
    this.clearSession();
  }

  clearSession(): void {
    this.tokenService.clearTokens();
  }

  get currentUserValue(): User | null {
    const role = this.tokenService.getRole() as UserRole;
    const token = this.tokenService.getAccessToken();

    if (!role || !token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        name: payload.name || payload.fullName || payload.sub || '',
        email: payload.sub || payload.email || '',
        role
      };
    } catch {
      return { name: '', email: role, role };
    }
  }

  hasRole(role: UserRole): boolean {
    return this.tokenService.getRole() === role;
  }

  get isAuthenticated(): boolean {
    return this.tokenService.isLoggedIn();
  }
}
