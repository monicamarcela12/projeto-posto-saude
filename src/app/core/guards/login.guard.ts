
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(private loginService: LoginService, private router: Router) { };

    canActivate(): boolean {
        let acesso = false;

        if (this.loginService.isLoggedIn()) {
          this.router.navigate(["/admin"]);
          return acesso
        }else{
            return !acesso
        }
    };
}
