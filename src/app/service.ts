import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Service} from './models/Service';
import {Booking} from './models/Booking';

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

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>('http://localhost:8080/api/bookings', booking);
  }


  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  submitReview(review: { rating: number; comment: string }, bookingId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/reviews`, review);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/auth/login', credentials);
  }

  getAllBookings() {
    return this.http.get<any>('http://localhost:8080/api/bookings');

  }
}
