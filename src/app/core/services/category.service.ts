import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../interfaces/environment';
import { ApiResponse } from '../interfaces/api-response';
import { CategoryResponse, CategoryDetailResponse } from '../interfaces/dto';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private readonly apiUrl = `${environment.apiBaseUrl}/categories`;

    constructor(private http: HttpClient) { }

    createCategory(name: string): Observable<ApiResponse<CategoryResponse>> {
        return this.http.post<ApiResponse<CategoryResponse>>(this.apiUrl, { name });
    }

    getCategories(): Observable<ApiResponse<CategoryResponse[]>> {
        return this.http.get<ApiResponse<CategoryResponse[]>>(this.apiUrl);
    }

    getCategoriesDetails(): Observable<ApiResponse<CategoryDetailResponse[]>> {
        return this.http.get<ApiResponse<CategoryDetailResponse[]>>(`${this.apiUrl}/details`);
    }

    updateCategory(id: number, name: string, monthlyLimit?: number): Observable<ApiResponse<CategoryResponse>> {
        return this.http.put<ApiResponse<CategoryResponse>>(`${this.apiUrl}/${id}`, { name, monthlyLimit });
    }

    deleteCategory(id: number): Observable<string> {
        return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
    }
}
