import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request =  this.addToken(request);
    return next.handle(request);
  }

  // private addToken(request: HttpRequest<unknown>){
  //   const token = this.tokenService.getAll();
  //   if (token) {
  //     const authReq = request.clone({
  //       headers : request.headers.set('Authorization', `Bearer ${token}`)
  //     });
  //     return authReq;
  //   }
  //   return request;
  // }

  private addToken(request: HttpRequest<unknown>) {
    const token = this.tokenService.getAll();

    if (!token) {
        return request;
    }

    const authResquest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
    });

    return authResquest;
}

}
