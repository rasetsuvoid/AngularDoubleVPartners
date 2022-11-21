import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Paso por el interceptor')
    
    var token;
    if(localStorage.getItem('token') != null && localStorage.getItem('token') != ""){
      token = localStorage.getItem('token')
    }

    return next
    .handle(
      req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    );

  }
}
