import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../interfaces/environment';
import { ApiResponse, PaginatedData } from '../interfaces/api-response';
import { TransactionResponse, CreateTransactionPayload } from '../interfaces/dto';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private readonly apiUrl = `${environment.apiBaseUrl}/transactions`;

    constructor(private http: HttpClient) { }

    createTransaction(payload: CreateTransactionPayload): Observable<ApiResponse<TransactionResponse>> {
        return this.http.post<ApiResponse<TransactionResponse>>(this.apiUrl, payload);
    }

    getParentTransactions(page: number = 0, size: number = 10): Observable<ApiResponse<PaginatedData<TransactionResponse>>> {
        return this.http.get<ApiResponse<PaginatedData<TransactionResponse>>>(
            `${this.apiUrl}/parent?page=${page}&size=${size}`
        );
    }

    getChildTransactions(page: number = 0, size: number = 10): Observable<ApiResponse<PaginatedData<TransactionResponse>>> {
        return this.http.get<ApiResponse<PaginatedData<TransactionResponse>>>(
            `${this.apiUrl}/child?page=${page}&size=${size}`
        );
    }
}
