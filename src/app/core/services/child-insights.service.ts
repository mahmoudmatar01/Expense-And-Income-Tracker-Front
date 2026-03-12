import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../interfaces/environment';
import { ApiResponse } from '../interfaces/api-response';
import { ChildOverview, ChildSpendingByCategory } from '../interfaces/dto';

@Injectable({
    providedIn: 'root'
})
export class ChildInsightsService {
    private readonly apiUrl = `${environment.apiBaseUrl}/child/insights`;

    constructor(private http: HttpClient) { }

    getDashboardOverview(): Observable<ApiResponse<ChildOverview>> {
        return this.http.get<ApiResponse<ChildOverview>>(`${this.apiUrl}/overview`);
    }

    getSpendingByCategory(): Observable<ApiResponse<ChildSpendingByCategory[]>> {
        return this.http.get<ApiResponse<ChildSpendingByCategory[]>>(`${this.apiUrl}/spending-by-category`);
    }
}
