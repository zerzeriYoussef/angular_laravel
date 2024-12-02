import { Component,OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterLink,ReactiveFormsModule,FormsModule],

  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent {
  Books: any = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.index().subscribe(
      res => {
        console.log("API Response:", res);
        this.Books = res.data; // Adjust to access the "data" array from your API response
      },
      err => {
        console.error("API Error:", err);
      }
    );
  }
  

  delete(id: any, i: number): void {
    this.authService.delete(id).subscribe(
      () => {
        this.Books.splice(i, 1); // Removes the deleted book from the list
      },
      err => {
        console.error("Error deleting book:", err);
      }
    );
  }
  
  }

