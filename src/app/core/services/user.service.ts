import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/app.api';
import { BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  urlService(){
    return 'usuario'
  }

  public findById(id: any): Observable<any> {
    return this.http.get(`${API}/usuario/${id}`);
  }

  
  public findPatologia(url:string, filter?: any): Observable<any> {
    return this.http.get(`${API}/patologia`, { params: filter });
  }

  
  public findAgente(url:string, filter?: any): Observable<any> {
    return this.http.get(`${API}/user`, { params: filter });
  }

  
  public findUser(url:string, filter?: any): Observable<any> {
    return this.http.get(`${API}/patologia`, { params: filter });
  }

}
