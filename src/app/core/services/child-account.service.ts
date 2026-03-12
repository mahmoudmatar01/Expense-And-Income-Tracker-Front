import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../interfaces/environment';
import { ApiResponse } from '../interfaces/api-response';
import { ChildResponse, CreateChildPayload } from '../interfaces/dto';

@Injectable({
    providedIn: 'root'
})
export class ChildAccountService {
    private readonly apiUrl = `${environment.apiBaseUrl}/parent/child`;

    constructor(private http: HttpClient) { }

    createChild(payload: CreateChildPayload): Observable<string> {
        return this.http.post(this.apiUrl, payload, { responseType: 'text' });
    }

    getParentChildren(): Observable<ApiResponse<ChildResponse[]>> {
        return this.http.get<ApiResponse<ChildResponse[]>>(this.apiUrl);
    }

    updateChildStatus(childId: number): Observable<string> {
        return this.http.put(`${this.apiUrl}/${childId}/status`, {}, { responseType: 'text' });
    }
}
