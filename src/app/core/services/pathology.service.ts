import { API } from '../../app.api';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class PathologyService extends BaseService {

  urlService(){
    return 'patologia'
  }

  public deletePatologia(id): Observable<any>{
    return this.http.delete(`${API}/patologia}/${id}`)
  }

  public findPatologia(url:string, filter?: any): Observable<any> {
    return this.http.get(`${API}/patologia`, { params: filter });
  }

  public findById(id: any): Observable<any> {
    return this.http.get(`${API}/patologia/${id}`);
  }

  public postPatologia(data): Observable<any>{
    return this.http.post(`${API}/patologia`, data)
  }

  public putPatologia(id, data): Observable<any>{
    return this.http.put(`${API}/patologia/${id}`, data)
  }
}
