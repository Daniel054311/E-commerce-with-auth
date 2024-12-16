
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { switchMap, catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../models/types';

export const AuthInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const decodedToken: DecodedToken = jwtDecode(token);
    const refreshThreshold = 60 * 1000;

    if (decodedToken.exp * 1000 - Date.now() < refreshThreshold) {
      console.log('Refreshing token',refreshThreshold);
      return authService.refreshToken().pipe(
        switchMap((newTokens) => {

          localStorage.setItem('token', newTokens.token);

          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${newTokens.token}`
            }
          });

          return next(request);
        }),
        catchError((error) => {
          authService.logout();
          return next(request);
        })
      );
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  return next(request);
};
