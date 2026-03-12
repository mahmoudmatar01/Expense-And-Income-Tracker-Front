import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../interfaces/environment';
import { ApiResponse } from '../interfaces/api-response';
import { BudgetResponse, CreateBudgetPayload } from '../interfaces/dto';

@Injectable({
    providedIn: 'root'
})
export class BudgetService {
    private readonly apiUrl = `${environment.apiBaseUrl}/budgets`;

    constructor(private http: HttpClient) { }

    createBudget(categoryId: number, monthlyLimit: number): Observable<ApiResponse<BudgetResponse>> {
        const payload: CreateBudgetPayload = { categoryId, monthlyLimit };
        return this.http.post<ApiResponse<BudgetResponse>>(this.apiUrl, payload);
    }

    getBudgets(): Observable<ApiResponse<BudgetResponse[]>> {
        return this.http.get<ApiResponse<BudgetResponse[]>>(this.apiUrl);
    }
}
