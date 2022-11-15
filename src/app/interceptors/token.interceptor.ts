import { API } from './../services/conf';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError, Observable, of, throwError, filter } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const headers = new HttpHeaders({
      'authorization': sessionStorage.getItem('jwt') || ''
    })

    request = request.clone({
      headers
    });

    return next.handle(request)
      .pipe(this.responseManagement);
  }

  responseManagement(response: any){
    response.subscribe({
      next: (res: any) => {
        if(res.body?.code === 4){
          this.router.navigate(['account/login']);
        }
      }
    })
    return response;
  }
}