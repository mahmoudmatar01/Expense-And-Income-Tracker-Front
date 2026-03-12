import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';

// Module-level state for coordinating token refresh across concurrent requests
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

/** Endpoints that should NOT have the Authorization header attached */
const SKIP_URLS = ['/auth/login', '/auth/register', '/auth/refresh'];

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(TokenService);
  const authService = inject(AuthService);
  const router = inject(Router);

  // Skip interception for auth endpoints
  if (SKIP_URLS.some(url => req.url.includes(url))) {
    return next(req);
  }

  // Attach token if available
  const token = tokenService.getAccessToken();
  let authReq = req;
  if (token) {
    authReq = addToken(req, token);
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && tokenService.getRefreshToken()) {
        return handle401Error(authReq, next, tokenService, authService, router);
      }

      if (error.status === 401) {
        authService.clearSession();
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};

function addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}

function handle401Error(
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  tokenService: TokenService,
  authService: AuthService,
  router: Router
) {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap(res => {
        isRefreshing = false;

        if (res.success && res.data) {
          refreshTokenSubject.next(res.data.accessToken);
          return next(addToken(req, res.data.accessToken));
        }

        // Refresh response was not successful
        authService.clearSession();
        router.navigate(['/login']);
        return throwError(() => new Error('Token refresh failed'));
      }),
      catchError(err => {
        isRefreshing = false;
        authService.clearSession();
        router.navigate(['/login']);
        return throwError(() => err);
      })
    );
  } else {
    // Another request is already refreshing — wait for the new token
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(token => next(addToken(req, token!)))
    );
  }
}