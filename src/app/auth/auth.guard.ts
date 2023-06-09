import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { take, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard  {
    constructor(private authService: AuthenticationService,
                private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.authService.loggedUser.pipe(
            take(1),
            map(
                (user) => {
                    const isAuth = !!user;

                    if (isAuth) {
                        return true;
                    }

                    return this.router.createUrlTree(['/login']);
                }
            )
        )
    }
}
