import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API } from '../../app.api';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

  abstract urlService();
  constructor(protected http: HttpClient) {}

  public get(page?: number, limite?:number): Observable<any>{
    let filter
    if(page){ filter = new HttpParams().set('limit', `${limite ? limite : limite = 10}`).append('page', `${page}`)}
    return this.http.get(`${API}/${this.urlService()}`, {params: filter})
  }

  public getId(id:number): Observable<any>{
    return this.http.get(`${API}/${this.urlService()}/${id}`)
  }

  public post(data): Observable<any>{
    return this.http.post(`${API}/${this.urlService()}`, data)
  }

  public put(id, data): Observable<any>{
    return this.http.put(`${API}/${this.urlService()}/${id}`, data)
  }

  public patch(id: number, data): Observable<any>{
    return this.http.patch(`${API}/${this.urlService()}/${id}`, data)
  }

  public delete(id): Observable<any>{
    return this.http.delete(`${API}/${this.urlService()}/${id}`)
  }

  public search(url:string, filter?: any): Observable<any> {
    return this.http.get(`${API}/${this.urlService()}`, { params: filter });
  }

}
