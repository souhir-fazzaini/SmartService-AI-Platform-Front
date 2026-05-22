import { Component, OnInit } from '@angular/core';
import {Service} from '../../../models/Service';
import {ServiceApi} from '../../../service';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-service-list',
  imports: [
    NgForOf
  ],
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  services: Service[] = [];

  constructor(private serviceApi: ServiceApi, private router: Router) {}

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices() {
    this.serviceApi.getAllServices().subscribe(data => {
      this.services = data;
    });

  }
  reserve(service: any) {
    console.log("Service réservé :", service);

    // exemple simple navigation vers booking
    // this.router.navigate(['/booking', service.id]);

    // ou redirection vers bookings list
    this.router.navigate(['/bookings']);
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
