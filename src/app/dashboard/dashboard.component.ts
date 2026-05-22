import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',

  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userName = 'User';
  activeRoute = 'dashboard';

  stats = [
    {
      label: 'Total Bookings',
      value: 142,
      delta: '↑ 12% this month',
      deltaUp: true,
      icon: 'assets/icons/calendar-check.svg',
      color: 'blue'
    },
    {
      label: 'Active Services',
      value: 8,
      delta: '↑ 2 new',
      deltaUp: true,
      icon: 'assets/icons/briefcase.svg',
      color: 'green'
    },
    {
      label: 'Pending',
      value: 5,
      delta: '↓ 3 vs last week',
      deltaUp: false,
      icon: 'assets/icons/clock.svg',
      color: 'amber'
    }
  ];

  cards = [
    {
      title: 'Bookings',
      subtitle: '142 total reservations',
      icon: '📅',
      color: 'blue',
      route: 'bookings'
    },
    {
      title: 'Services',
      subtitle: '8 active services',
      icon: '🛠️',
      color: 'teal',
      route: 'services'
    },
    {
      title: 'Profile',
      subtitle: 'Manage your account',
      icon: '👤',
      color: 'purple',
      route: 'profile'
    }
  ];

  recentBookings = [
    { name: 'Home Cleaning', date: 'Today, 10:00 AM', status: 'confirmed' },
    { name: 'Plumbing Repair', date: 'Tomorrow, 2:00 PM', status: 'pending' },
    { name: 'Electrical Check', date: 'May 20', status: 'cancelled' }
  ];

  popularServices = [
    { name: 'Cleaning', count: 54, percent: 85 },
    { name: 'Plumbing', count: 38, percent: 60 },
    { name: 'Electrical', count: 27, percent: 42 },
    { name: 'Painting', count: 16, percent: 25 }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url.replace('/', '') || 'dashboard';
      }
    });
  }

  onNavigate(route: string): void {
    this.router.navigate([`/${route}`]);
  }
}
