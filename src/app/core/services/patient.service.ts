import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from 'src/app/app.api';
import { BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends BaseService {

  urlService(){
    return 'paciente'
  }

  public findById(id: any): Observable<any> {
    return this.http.get(`${API}/paciente/${id}`);
  }

  public findPatient(url:string, filter?: any): Observable<any> {
    return this.http.get(`${API}/paciente`, { params: filter });
  }

  public findASC(): Observable<any> {
    return this.http.get(`${API}/usuario`);
  }

  public findPatologia(): Observable<any> {
    return this.http.get(`${API}/patologia`);
  }

}
