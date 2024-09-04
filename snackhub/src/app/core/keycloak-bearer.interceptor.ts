import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class KeycloakBearerInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const accessToken = sessionStorage.getItem('accessToken');

    if (!request.headers.has('Authorization') && accessToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`),
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if (
          error.status === 401 ||
          (error.status === 0 && error.statusText === 'Unknown Error')
        ) {
          sessionStorage.clear();
          this.router.navigateByUrl('/');
        }

        return throwError(() => error);
      })
    );
  }
}
