import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  // 👤 User data
  user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'User',
    phone: '+216 12 345 678',
    address: 'Tunis, Tunisia',
    createdAt: '2026-01-01'
  };

  // ✏️ Edit profile action
  editProfile() {
    console.log('Edit profile clicked');
    // ici plus tard tu peux ouvrir un modal ou form
  }

  // 🚪 Logout action
  logout() {
    console.log('Logout clicked');
    // ici tu peux faire redirect + remove token
  }

}
