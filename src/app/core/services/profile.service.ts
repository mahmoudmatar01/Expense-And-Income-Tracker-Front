import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../interfaces/environment';
import { ApiResponse } from '../interfaces/api-response';
import { ProfileResponse, UpdateProfilePayload } from '../interfaces/dto';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private readonly apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    getProfile(): Observable<ApiResponse<ProfileResponse>> {
        return this.http.get<ApiResponse<ProfileResponse>>(`${this.apiUrl}/auth/me`);
    }

    updateProfile(payload: UpdateProfilePayload): Observable<ApiResponse<ProfileResponse>> {
        return this.http.put<ApiResponse<ProfileResponse>>(`${this.apiUrl}/parent/profile`, payload);
    }
}
