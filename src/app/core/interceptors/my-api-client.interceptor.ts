import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyApiClientInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(localStorage.getItem('userToken') != null){
      let userToken:any = {
        token:localStorage.getItem('userToken'),
      }
  
      request = request.clone({
        setHeaders: userToken,
      })
    }
    

    return next.handle(request);
  }
}
