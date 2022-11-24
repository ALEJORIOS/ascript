import { API } from './../services/conf';
import { catchError, Observable, tap } from 'rxjs';
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

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const headers = new HttpHeaders({
      'authorization': sessionStorage.getItem('jwt') || ''
    })

    request = request.clone({
      headers
    });

    return next.handle(request)
  }
}