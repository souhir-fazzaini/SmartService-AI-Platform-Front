import { Component, OnInit } from '@angular/core';
import {Service} from '../../../models/Service';
import {ServiceApi} from '../../../service';
import {NgForOf, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {Booking} from '../../../models/Booking';

@Component({
  selector: 'app-service-list',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  services: Service[] = [];
  showModal = false;

  selectedService: any;
  constructor(private serviceApi: ServiceApi, private router: Router, private bookingService: ServiceApi) {}

  ngOnInit(): void {
    this.loadServices();
  }
  openModal(service: any) {
    this.selectedService = service;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  confirmReservation(booking: Booking) {

    console.log(booking)





    this.bookingService.createBooking(booking).subscribe({
      next: (res) => {
        alert('Reservation confirmed');
        this.closeModal();
      },
      error: (err) => {
        console.error(err);
        alert('Error while booking');
      }
    });
  }
  loadServices() {
    this.serviceApi.getAllServices().subscribe(data => {
      this.services = data;
    });

  }

  delete(id: number): void {
    this.serviceApi.deleteService(id).subscribe({
      next: () => {
        this.loadServices(); // refresh list
      },
      error: (err) => {
        console.error('Error deleting service', err);
      }
    });
  }
}
