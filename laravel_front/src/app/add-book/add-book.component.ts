import { Component, OnInit ,NgZone} from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth-service.service';


@Component({
  selector: 'app-add-book',
  standalone: true,
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  imports: [ReactiveFormsModule, FormsModule] // Import necessary modules directly
})
export class AddBookComponent  {
  bookForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder, // Fix the typo here
    private router:Router,
    private ngZone:NgZone,
    private crudService: AuthService
  ) { 
     this.bookForm = this.formBuilder.group({
       name: [''],
       status: [''],
     })
  }
  
  ngOnInit(): void {
  }

  onSubmit():any{
    this.crudService.add(this.bookForm.value)
    .subscribe(()=>{
      console.log('Data added successfully')
      this.ngZone.run(()=> this.router.navigateByUrl('/books-list'))
    },(err)=>{
      console.log(err)
    })
  }}
