import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { AuthService } from '../auth-service.service'; // Assuming you have AuthService
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule], // Import here
  standalone: true,

  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Initialize the form group with validation
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  // Custom validator to check if password and confirmPassword match
  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Submit the registration form
  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;  // Do nothing if the form is invalid
    }

    this.isSubmitting = true;  // Show loading spinner or disable button while submitting

    const { name, email, password } = this.registerForm.value;
    
    // Call register API
    this.authService.register({ name, email, password }).subscribe({
      next: (response) => {
        alert('Registration successful!');
        this.router.navigate(['/login']);  // Redirect to login page after successful registration
      },
      error: (err) => {
        console.error('Registration error:', err);
        alert('Registration failed. Please try again.');
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
