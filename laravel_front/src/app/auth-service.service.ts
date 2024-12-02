import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Book } from './service/Book';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://127.0.0.1:8000/api/auth'; // Update with your Laravel URL
  private apiurl = 'http://127.0.0.1:8000/api'; // Update with your Laravel URL

  constructor(private http: HttpClient) {}

  // Register
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiURL}/register`, user);
  }

  // Login
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiURL}/login`, credentials);
  }

  // Logout
  logout(): Observable<any> {
    return this.http.post(`${this.apiURL}/logout`, {});
  }

  // Refresh Token
  refresh(): Observable<any> {
    return this.http.post(`${this.apiURL}/refresh`, {});
  }

  // Get User Profile
/* getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiURL}/user-profile`);
  }*/
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiURL}/user-profile`, { headers });
  }
  index(): Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get('http://127.0.0.1:8000/api/posts', { headers });

  }
  delete(id: any): Observable<any> {
    const API_URL = `${this.apiurl}/posts/${id}`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete(`http://127.0.0.1:8000/api/posts/${id}`, { headers 
    });
  }
  add(data: any): Observable<any> {
    const API_URL = `${this.apiurl}/posts`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(API_URL, data, { headers });
}
getBook(id: any): Observable<any> {
  const API_URL = `${this.apiurl}/post/${id}`;
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.get(API_URL, { headers }).pipe(
    catchError((error) => {
      console.error('Error fetching book:', error);
      return throwError(() => new Error('Failed to fetch the book.'));
    })
  );
}


updateBook(id: any, data: Book): Observable<any> {
  let API_URL = `${this.apiurl}/post/${id}`;
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.put(API_URL, data, {headers});
}
}
