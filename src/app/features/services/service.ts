import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Service} from '../../models/Service';

@Injectable({
  providedIn: 'root'
})
export class ServiceApi {

  private baseUrl = 'http://localhost:8080/api/services';

  constructor(private http: HttpClient) {}

  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.baseUrl);
  }

  createService(service: Service): Observable<Service> {
    return this.http.post<Service>(this.baseUrl, service);
  }

  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/auth/login', credentials);
  }
}
