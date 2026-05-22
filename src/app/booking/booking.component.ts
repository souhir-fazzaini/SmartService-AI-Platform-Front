import { Component, OnInit } from '@angular/core';
import {CommonModule, NgClass} from '@angular/common';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  imports: [
    NgClass,
    CommonModule
  ],
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  bookings: any[] = [];

  ngOnInit(): void {
    // Mock data (remplace par API Spring Boot après)
    this.bookings = [
      {
        id: 1,
        service: 'Web Development',
        date: '2026-05-22',
        status: 'Pending'
      },
      {
        id: 2,
        service: 'UI Design',
        date: '2026-05-20',
        status: 'Confirmed'
      },
      {
        id: 3,
        service: 'Mobile App',
        date: '2026-05-18',
        status: 'Cancelled'
      }
    ];
  }

  cancelBooking(id: number) {
    const booking = this.bookings.find(b => b.id === id);
    if (booking) {
      booking.status = 'Cancelled';
    }
  }
}
