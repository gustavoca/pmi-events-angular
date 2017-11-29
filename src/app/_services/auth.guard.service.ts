import { AuthService } from 'app/login/auth.service';
import { Injectable } from '@angular/core';
import { CanActivateChild, CanActivate,  Router,  ActivatedRouteSnapshot,  RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router: Router, private auth: AuthService) {}

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkRoutes(next, state);
    }

    canActivateChild(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkRoutes(next, state);
    }

    checkRoutes(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const path: string = next.url[0] ? next.url[0].path : '';
        if (path === 'login' && this.isAuthenticated()) {
          this.router.navigate(['/']);
          return false;
        } else if (path === 'login' && (!this.isAuthenticated()) ) {
          return true;
        } else if (path !== 'login' && (!this.isAuthenticated())) {
          this.router.navigate(['/login']);
          return true;
        } else {
          return true;
        }
    }

    isAuthenticated(): boolean {
      return this.auth.checkToken();
    }
}