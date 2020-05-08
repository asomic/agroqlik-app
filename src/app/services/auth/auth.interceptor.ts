
//angular
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//rxjs
import { Observable, throwError, from} from 'rxjs';
import { retry, catchError, map, take, retryWhen } from 'rxjs/operators';


//services
import { AuthService } from '../../services/auth/auth.service';
import { TestBed } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  counter: number = 0 ; 
  constructor(
    private authService: AuthService,
    private router: Router,
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('requestoooo');
    console.log(request);
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        // this.counter++
        // console.log('counter: '+this.counter);
        if (error.status === 401) {
          console.log('401');
          if(error.error.error == "No autenticado."){
            console.log('No autenticado.');
            this.authService.authRefresh();
          } else {
            console.log('otro error');
          }
        }
        return throwError(error);
      })
    );
  }

  addAuthHeader(request) {
    const authHeader = this.authService.auth;
    console.log();
    if (authHeader) {
        return request.clone({
            setHeaders: {
                "Authorization": ""
            }
        });
    }
    return request;
  }
}



// auth => {
//   if (auth){
//     console.log(auth);
//     request = request.clone({
//       setHeaders: {
//           'authorization': 'Bearer ' + auth
//       }
//   });
//     return next.handle(request);
//   } else {
//     console.log('auth from refresh null or false');
//   }
//   return throwError(error);
// }