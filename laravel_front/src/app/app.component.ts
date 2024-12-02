import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from './auth-service.service'; // Import AuthService
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterOutlet, RouterLink,HttpClientModule],
})
export class AppComponent {
  title = 'laravel_front';

constructor(private authService: AuthService, private router: Router) {}
isLoggedIn(): boolean {
  return localStorage.getItem('token') !== null;  
}
logout() {
  this.authService.logout().subscribe({
    next: () => {
      localStorage.removeItem('token'); // Remove the token from localStorage
      alert('Logged out successfully');
      this.router.navigate(['/login']); // Redirect to login page
    },
    error: (err) => {
      console.error('Logout error:', err);
      alert('Logout failed. Check the console for more details.');
    },
  });
}
}
