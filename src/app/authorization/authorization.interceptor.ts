import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (sessionStorage.getItem('token')) {
      const newRequest = req.clone({
        headers: req.headers.set('Authorization', 'Basic ' + sessionStorage.getItem('token'))
      })

      return next.handle(newRequest);
    }
    return next.handle(req);
  }
}