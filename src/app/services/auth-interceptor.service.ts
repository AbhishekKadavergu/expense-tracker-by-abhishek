import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UtilityService } from './utility.service';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private utSer: UtilityService, private router: Router) {} 
 intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
    const token = this.utSer.getAuthToken();

   if (token) {
     // If we have a token, we set it to the header
     request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
     });
  }

  return next.handle(request).pipe(
    catchError((err)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status===401){
          this.router.navigateByUrl('login')
        }
      }
      return throwError(err)
    })
  )
  }
}