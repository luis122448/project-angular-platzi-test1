import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // const token = this.tokenService.getAll();
    // if (token) {
    //   return true;
    // }
    // this.router.navigateByUrl('/home'); // Redireccion, sino tiene Token
    // return false;
    return this.authService.myUser$
    .pipe(
      // Poder transformar Map
      map(user => {
        if(user) {
          return true
        }
        this.router.navigate(['/home']); // Redireccion, sino tiene Token
        return false;
      })
    )
  }

}
