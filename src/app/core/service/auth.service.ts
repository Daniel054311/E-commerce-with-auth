// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginResponse, User } from '../models/user.model';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.authEndpoint}`;

  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

 

 public login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
  }
 public register(data: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}register`, data)
    
  }

 public logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

}
