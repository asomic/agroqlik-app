import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { take, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
): Observable<boolean> | Promise<boolean> | boolean {
  return this.authService.isAuthenticated.pipe(
  take(1),
  switchMap(
    isAuth => {
      if (!isAuth) {
        return this.authService.authRecall();
      } else {
        return of(isAuth);
      }
    }
  ),
  tap(
    isAuth => {
      if (!isAuth) {
        this.router.navigateByUrl('/login');
      }
    }
  ));
}
}
