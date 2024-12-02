import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth-service.service';

interface BookResponse {
  data: {
    name: string;
    status: string;
  };
  message: string;
  status: number;
}

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: 'book-detail.component.html',
  styleUrl: 'book-detail.component.css'
})
export class BookDetailComponent implements OnInit {
  getId: string;
  updateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    private authService: AuthService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    this.updateForm = this.formBuilder.group({
      name: [''],
      status: ['']
    });
  }

  ngOnInit(): void {
    this.loadBookDetails();
  }

  loadBookDetails(): void {
    this.authService.getBook(this.getId).subscribe({
      next: (response: BookResponse) => {
        console.log('API Response:', response);
        // Check if response.data exists and has the expected properties
        if (response.data) {
          this.updateForm.patchValue({
            name: response.data.name,
            status: response.data.status
          });
        }
      },
      error: (error) => {
        console.error('Error fetching book:', error);
      }
    });
  }

  onUpdate(): void {
    if (this.updateForm.valid) {
      this.authService.updateBook(this.getId, this.updateForm.value).subscribe({
        next: () => {
          console.log('Data updated successfully');
          this.ngZone.run(() => this.router.navigateByUrl('/books-list'));
        },
        error: (error) => {
          console.error('Error updating book:', error);
        }
      });
    }
  }
}


