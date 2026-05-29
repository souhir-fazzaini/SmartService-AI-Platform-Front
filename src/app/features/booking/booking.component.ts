import { Component, OnInit } from '@angular/core';
import {CommonModule, NgClass} from '@angular/common';
import {ServiceApi} from '../../service';
import {Router} from '@angular/router';
import {Booking} from '../../models/Booking';
import {Reviews} from '../../reviews';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  imports: [CommonModule],
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookings: Booking[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  services: any[] = [];
  ratings: { [bookingId: number]: number } = {};
  comments: { [bookingId: number]: string } = {};
  reviewSent: { [bookingId: number]: boolean } = {};
  summaries: { [serviceId: number]: string } = {};
  isLoadingSummary: { [serviceId: number]: boolean } = {};


  constructor(private serviceApi: ServiceApi, private reviews: Reviews, private router: Router) {
  }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.isLoading = true;
    this.serviceApi.getAllBookings().subscribe({
      next: (data: Booking[]) => {
        this.bookings = data;
        console.log(this.bookings)
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des réservations.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  setRating(bookingId: number, star: number): void {
    this.ratings[bookingId] = star;
  }

  getRating(bookingId: number): number {
    return this.ratings[bookingId] || 0;
  }

  setComment(bookingId: number, event: any): void {
    this.comments[bookingId] = event.target.value;
  }

  submitReview(bookingId: number, serviceId: number): void {

    // 👇 récupérer userId directement depuis bookings
    const booking = this.bookings.find(b => b.id === bookingId);
    const userId = booking?.userId;

    console.log('bookingId:', bookingId);
    console.log('serviceId:', serviceId);
    console.log('userId:', userId);

    if (!this.ratings[bookingId]) {
      alert('Veuillez sélectionner une note !');
      return;
    }

    const review = {
      rating: this.ratings[bookingId],
      comment: this.comments[bookingId] || ''
    };

    this.reviews.submitReview(review, serviceId, userId!).subscribe({
      next: () => {
        this.reviewSent[bookingId] = true;
      },
      error: (err) => console.error('Erreur review', err)
    });
  }

  loadSummary(serviceId: number): void {
    if (!serviceId) return; // 👈 garde si undefined

    this.isLoadingSummary[serviceId] = true;
    this.reviews.getReviewSummary(serviceId).subscribe({
      next: (data) => {
        this.summaries[serviceId] = data;
        this.isLoadingSummary[serviceId] = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoadingSummary[serviceId!] = false;
      }
    });
  }
}
