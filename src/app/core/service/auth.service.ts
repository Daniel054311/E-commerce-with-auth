
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginResponse, User } from '../models/types';


@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly apiUrl = `${environment.authEndpoint}`;

  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

 



public login(data: User): Observable<Partial<LoginResponse>> {
  return this.http.post<LoginResponse>(`${this.apiUrl}login`, data)
    .pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
        this.currentUserSubject.next(response.user);
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
    this.currentUserSubject.next(null);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }



  public getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

}
