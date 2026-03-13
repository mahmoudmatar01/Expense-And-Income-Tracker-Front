import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../interfaces/environment';
import { ApiResponse, PaginatedData } from '../interfaces/api-response';
import {
    AdminUserResponse,
    AdminDashboardOverview,
    UserDistribution,
    RecentUser,
    UserRegistrationStat,
    TransactionVolumeStat,
    AdminTransactionResponse
} from '../interfaces/admin';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    private readonly apiUrl = `${environment.apiBaseUrl}/admin`;

    constructor(private http: HttpClient) { }

    // ─── Users ──────────────────────────────────────────────

    getUsers(page: number = 0, size: number = 8): Observable<ApiResponse<PaginatedData<AdminUserResponse>>> {
        return this.http.get<ApiResponse<PaginatedData<AdminUserResponse>>>(
            `${this.apiUrl}/users?page=${page}&size=${size}`
        );
    }

    getUserDetails(id: number): Observable<ApiResponse<AdminUserResponse>> {
        return this.http.get<ApiResponse<AdminUserResponse>>(`${this.apiUrl}/users/${id}`);
    }

    changeUserStatus(id: number): Observable<string> {
        return this.http.put(`${this.apiUrl}/users/${id}/change-status`, {}, { responseType: 'text' });
    }

    deleteUser(id: number): Observable<string> {
        return this.http.delete(`${this.apiUrl}/users/${id}`, { responseType: 'text' });
    }

    getSuspendedUsers(page: number = 0, size: number = 10): Observable<ApiResponse<PaginatedData<AdminUserResponse>>> {
        return this.http.get<ApiResponse<PaginatedData<AdminUserResponse>>>(
            `${this.apiUrl}/users/suspended?page=${page}&size=${size}`
        );
    }

    // ─── Transactions ───────────────────────────────────────

    getAdminTransactions(page: number = 0, size: number = 8): Observable<ApiResponse<PaginatedData<AdminTransactionResponse>>> {
        return this.http.get<ApiResponse<PaginatedData<AdminTransactionResponse>>>(
            `${this.apiUrl}/transactions?page=${page}&size=${size}`
        );
    }

    // ─── Dashboard ──────────────────────────────────────────

    getDashboardOverview(): Observable<ApiResponse<AdminDashboardOverview>> {
        return this.http.get<ApiResponse<AdminDashboardOverview>>(`${this.apiUrl}/dashboard`);
    }

    getUserDistribution(): Observable<ApiResponse<UserDistribution>> {
        return this.http.get<ApiResponse<UserDistribution>>(`${this.apiUrl}/dashboard/user-distribution`);
    }

    getRecentUsers(page: number = 0, size: number = 5): Observable<ApiResponse<PaginatedData<RecentUser>>> {
        return this.http.get<ApiResponse<PaginatedData<RecentUser>>>(
            `${this.apiUrl}/dashboard/recent-users?page=${page}&size=${size}`
        );
    }

    getTransactionVolume(): Observable<ApiResponse<TransactionVolumeStat[]>> {
        return this.http.get<ApiResponse<TransactionVolumeStat[]>>(`${this.apiUrl}/dashboard/transactions-volume`);
    }

    getUserRegistrations(): Observable<ApiResponse<UserRegistrationStat[]>> {
        return this.http.get<ApiResponse<UserRegistrationStat[]>>(`${this.apiUrl}/dashboard/user-registrations`);
    }
}
