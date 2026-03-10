import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap, catchError } from 'rxjs/operators';

export enum UserRole {
    Admin = 'Admin',
    Parent = 'Parent',
    Child = 'Child'
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    token: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    role: 'PARENT';
}

export interface AuthResponse {
    user: User;
    token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly API_URL = '/api/auth';
    private currentUserSubject: BehaviorSubject<User | null>;
    public currentUser$: Observable<User | null>;

    constructor(private http: HttpClient) {
        const storedUser = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User | null>(
            storedUser ? JSON.parse(storedUser) : null
        );
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User | null {
        return this.currentUserSubject.value;
    }

    /**
     * Login — currently mocked, ready for backend integration.
     * Will POST to /api/auth/login when backend is available.
     */
    login(email: string, role: UserRole): User {
        const mockToken = btoa(
            JSON.stringify({ sub: email, role, exp: Math.floor(Date.now() / 1000) + 3600 })
        );
        const user: User = {
            id: Math.random().toString(36).substring(2, 9),
            name: email.split('@')[0],
            email,
            role,
            token: mockToken
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
    }

    /**
     * Register — mock implementation that simulates API call.
     * Ready to swap for real HTTP POST to /api/auth/register.
     */
    register(payload: RegisterPayload): Observable<AuthResponse> {
        // ── When backend is ready, replace with: ──
        // return this.http.post<AuthResponse>(`${this.API_URL}/register`, payload).pipe(
        //   tap(res => {
        //     localStorage.setItem('currentUser', JSON.stringify(res.user));
        //     this.currentUserSubject.next(res.user);
        //   })
        // );

        // ── Mock implementation ──
        // Simulate duplicate email check
        const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]') as any[];
        if (existingUsers.some((u: any) => u.email === payload.email)) {
            return throwError(() => ({
                status: 409,
                error: { message: 'An account with this email already exists.' }
            })).pipe(delay(800));
        }

        const mockToken = btoa(
            JSON.stringify({ sub: payload.email, role: payload.role, exp: Math.floor(Date.now() / 1000) + 3600 })
        );

        const newUser: User = {
            id: Math.random().toString(36).substring(2, 9),
            name: payload.name,
            email: payload.email,
            role: UserRole.Parent,
            token: mockToken
        };

        // Persist to local mock "database"
        existingUsers.push({ name: payload.name, email: payload.email, role: payload.role });
        localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));

        const response: AuthResponse = { user: newUser, token: mockToken };

        return of(response).pipe(delay(1200)); // Simulate network latency
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    hasRole(role: string): boolean {
        const user = this.currentUserValue;
        return !!user && user.role === role;
    }
}
