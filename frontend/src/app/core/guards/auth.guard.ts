import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Agora 'isAuthenticated$' existe no AuthService
    return this.authService.isAuthenticated$.pipe(
      take(1), // Pega o valor atual e completa o observable
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          // Não autenticado, redireciona para a página de login
          return this.router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
        }
      })
    );
  }
}