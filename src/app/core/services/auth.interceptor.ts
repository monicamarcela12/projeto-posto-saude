import { LoginService } from './login.service';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private injector: Injector
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loginService = this.injector.get(LoginService)
        if (loginService.isLoggedIn() && request.url.search(environment.api) != -1 ) {
            if(loginService.getTokenExpired()){
                loginService.logout()
            }else{
                const authRequest = request.clone(
                    { setHeaders: { 'Authorization': `Bearer ${loginService.token}` } })
                return next.handle(authRequest)
            }
        } else {
            return next.handle(request)
        }
    }
}
