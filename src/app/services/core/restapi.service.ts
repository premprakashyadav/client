import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Userdata } from '../../models/user';
const endpoint = 'http://localhost:3000/notes';
const httpOptions = {
 headers: new HttpHeaders({
   'Content-type': 'application/json'
 })
};

@Injectable({
  providedIn: 'root'
})
export class RestapiService {
 

  constructor(private http: HttpClient) { }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

 
  getProducts(): Observable<Userdata[]> {
    return this.http.get<Userdata[]>(endpoint)
      .pipe(
        tap(heroes => console.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }
  
  getProduct(id): Observable<Userdata> {
    const url = `${endpoint}/${id}`;
    return this.http.get<Userdata>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<Userdata>(`getProduct id=${id}`))
    );
  }
  
  addProduct (product): Observable<Userdata> {
    return this.http.post<Userdata>(endpoint, product, httpOptions).pipe(
      tap((product: Userdata) => console.log(`added product w/ id=${product._id}`)),
      catchError(this.handleError<Userdata>('addProduct'))
    );
  }

 
  
  updateProduct(id, product): Observable<Userdata> {
    const url = `${endpoint}/${id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct(id): Observable<Userdata> {
    const url = `${endpoint}/${id}`;
  
    return this.http.delete<Userdata>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }
}
