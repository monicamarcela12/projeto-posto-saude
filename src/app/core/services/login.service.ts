import { API } from './../../app.api';
import { UserLoggedin } from './../../shared/models/user.model';
import { StorageService } from './localsorage.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  helper = new JwtHelperService();
  private _user: UserLoggedin;

  constructor(
    private http: HttpClient,
    private router: Router,
    private localstorageService: StorageService
  ) {}

  isLoggedIn(): boolean {
    if(this.localstorageService.getLocalStorage("user_asc_web")){
      return true
    }
  }

  login(body): Observable<any>{
    return this.http.post<UserLoggedin>(`${API}/auth`, body)
        .pipe(tap(user =>{
          this._user = user
          this.initUser(user)
        }))
  }

  registro(data): Observable<any>{
    return this.http.post(`${API}/usuario`,data)
  }

  logout() {
    this.localstorageService.removeLocalStorage("user_asc_web")
    this.localstorageService.removeLocalStorage("user_asc")

    delete this._user;
    this.router.navigate(['/'])
  }

  private initUser(response) {
    this._user = response;
    this.localstorageService.setLocalStorage("user_asc_web", this._user)
  }

  getRealStates(): Observable<any>{
    return this.http.get(`${API}/realestate/all`)
  }

  postSupport(body): Observable<any>{
    return this.http.post(`${API}/contact/support`, body)
  }

  private isValid() {
    return !!this.user;
  }

  get user() {
    if (this._user === undefined && this.localstorageService.getLocalStorage("user_asc_web") != null) {
      this._user = this.localstorageService.getLocalStorage("user_asc_web");
    }
    return this._user;
  }

  getTokenExpired(){
      return this.helper.isTokenExpired(this.user.token)
  }

  get token() {
    return this.isValid() && this.user.token;
  }

  get getDay(){
    var dataAtual = new Date();
    var dia = dataAtual.getDate();
    var mes = dataAtual.getMonth()
    var ano = dataAtual.getFullYear();

    return `${dia}/${mes}/${ano}`
  }

}
