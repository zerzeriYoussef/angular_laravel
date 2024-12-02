import { Component } from '@angular/core';
import { AuthService } from '../auth-service.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],

  template: `
    <form (submit)="onSubmit()">
      <input type="text" [(ngModel)]="credentials.email" name="email" placeholder="Email" />
      <input type="password" [(ngModel)]="credentials.password" name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  `,
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {} // Inject Router here

  onSubmit() {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        if (response.token) {
          localStorage.setItem('token', response.token);
          alert('Login successful!');
          
          // Redirect to the books-list route
          this.router.navigate(['/books-list']);
        } else {
          alert('Token not received.');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('Login failed. Check the console for more details.');
      },
    });
  }
}
