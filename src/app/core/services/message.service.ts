import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/app.api';
import { BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends BaseService {

  urlService(){
    return 'recado'
  }

  public findById(id: any): Observable<any> {
    return this.http.get(`${API}/recado/${id}`);
  }

  public findMessage(url:string, filter?: any): Observable<any> {
    return this.http.get(`${API}/recado`, { params: filter });
  }

  public findASC(): Observable<any> {
    return this.http.get(`${API}/usuario`);
  }

  public findUser(): Observable<any> {
    return this.http.get(`${API}/usuario`);
  }
}