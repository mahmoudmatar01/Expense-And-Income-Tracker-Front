import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../interfaces/environment';
import { ApiResponse } from '../interfaces/api-response';
import { WalletResponse, WalletPayload, ChildWalletResponse } from '../interfaces/dto';

@Injectable({
    providedIn: 'root'
})
export class WalletService {
    private readonly apiUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }


    createWallet(payload: WalletPayload): Observable<ApiResponse<WalletResponse>> {
        return this.http.post<ApiResponse<WalletResponse>>(`${this.apiUrl}/parent/wallets`, payload);
    }

    getParentWallets(): Observable<ApiResponse<WalletResponse[]>> {
        return this.http.get<ApiResponse<WalletResponse[]>>(`${this.apiUrl}/parent/wallets`);
    }

    updateWallet(walletId: number, payload: Partial<WalletPayload>): Observable<ApiResponse<WalletResponse>> {
        return this.http.put<ApiResponse<WalletResponse>>(`${this.apiUrl}/parent/wallets/${walletId}`, payload);
    }

    deleteWallet(walletId: number): Observable<string> {
        return this.http.delete(`${this.apiUrl}/parent/wallets/${walletId}`, { responseType: 'text' });
    }

    getChildWallet(): Observable<ApiResponse<ChildWalletResponse[]>> {
        return this.http.get<ApiResponse<ChildWalletResponse[]>>(`${this.apiUrl}/child/wallet`);
    }
}
