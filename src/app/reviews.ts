import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Service} from './models/Service';
import {Booking} from './models/Booking';

@Injectable({
  providedIn: 'root'
})
export class Reviews {

  private baseUrl = 'http://localhost:8080/api/reviews';
  constructor(private http: HttpClient) {}

  submitReview(review: { rating: number, comment: string }, serviceId: number, userId: number): Observable<any> {
    return this.http.post(
      `${this.baseUrl}?serviceId=${serviceId}&userId=${userId}`, // 👈 userId ajouté
      review
    );
  }
}
