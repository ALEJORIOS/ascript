import { API } from './../services/conf';
import { catchError, Observable, of, throwError, filter, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable, Pipe } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
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
      .pipe(
        tap(this.responseManagement)
      );
  }

  responseManagement(response: any){
    if(response.body?.code === 4){
      this.router.navigate(['account/login']);
    }
  }
}