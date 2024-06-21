import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class myHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
  if(localStorage.getItem('eToken') != null)
    {
      let headers :any ={token:localStorage.getItem('eToken')}

      req=req.clone({
        setHeaders:headers
      })
    }
 
  return next.handle(req);
}
}
