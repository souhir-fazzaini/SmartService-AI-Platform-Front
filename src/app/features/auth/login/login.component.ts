import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {ServiceApi} from '../../services/service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private serviceApi: ServiceApi,
    private router: Router
  ) {}

  login(): void {
    const credentials = {
      email: this.email,
      password: this.password
    };

    this.serviceApi.login(credentials).subscribe({
      next: (res: any) => {
        console.log('Login success:', res);

        if (res.token) {
          localStorage.setItem('token', res.token);
        }

        alert('Login success');

        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        console.error('Login error:', err);
        alert('Invalid credentials');
      }
    });
  }
}
