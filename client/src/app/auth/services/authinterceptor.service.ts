// auth-interceptor.ts
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export function authInterceptor(
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> {
  const token = localStorage.getItem('token');

  const modifiedReq = req.clone({
    setHeaders: {
      Authorization: token ?? '[]',
    },
  });

  return next(modifiedReq);
}
