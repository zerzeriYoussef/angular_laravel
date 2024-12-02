import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { BookListComponent } from './app/book-list/book-list.component';
import { AddBookComponent } from './app/add-book/add-book.component';
import { BookDetailComponent } from './app/book-detail/book-detail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './app/login-component/login-component.component';
import { AuthInterceptor } from './app/auth.interceptor';
import { RegisterComponent } from './app/register/register.component';
import { ReactiveFormsModule } from '@angular/forms'; // Add this import

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'books-list', component: BookListComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'edit-book/:id', component: BookDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },  // Add this route for registration

];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule,ReactiveFormsModule),  // Use importProvidersFrom
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,  // Ensure the interceptor is registered
      multi: true, // Important to allow multiple interceptors
    },
  ],
}).catch((err) => console.error(err));
