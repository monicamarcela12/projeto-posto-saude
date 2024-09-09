
import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { LoginService } from '../services/login.service';


@Injectable()
export class AdminGuard implements CanActivate, CanLoad {

    constructor(
        private loginService: LoginService,
        private router: Router
        ) { };

    canActivate(): boolean {
        let acesso = this.loginService.isLoggedIn();
        if(acesso){
            return true;
        }
        if (!acesso) {
            this.router.navigate(['/']);
        }
        return false
    };

    canLoad(): boolean {
      let acesso = this.loginService.isLoggedIn();
      if(acesso){
          return true;
      }
      if (!acesso) {
          this.router.navigate(['/']);
      }
      return false
  };
}
