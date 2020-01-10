import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError } from "rxjs/operators";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Interception In Progress"); //SECTION 1
    if(sessionStorage.getItem('token')){
      const token: string = sessionStorage.getItem('token');
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    }
    
    return next.handle(req)
        .pipe(
            catchError((error: HttpErrorResponse) => {
                //401 UNAUTHORIZED - SECTION 2
                if (error && error.status === 401) {
                    console.log("ERROR 401 UNAUTHORIZED")
                }
                const err = error.error.message || error.statusText;
                return throwError(err);                    
            })
        );
  }  
}
