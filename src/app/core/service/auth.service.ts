import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginResponse, User } from '../models/types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}`;

  public currentUser = signal<User | null>(null);

  constructor(private readonly http: HttpClient) {}

  public login(data: User): Observable<Partial<LoginResponse>> {
    return this.http.post<LoginResponse>(`${this.apiUrl}login`, data).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
        this.currentUser.set(response.user);
      })
    );
  }

  public refreshToken(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/refresh-token`, {});
  }

  public register(data: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}register`, data);
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.currentUser.set(null);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }
}
