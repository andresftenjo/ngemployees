import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  countriesUrl = 'http://restcountries.eu/rest/v1/all';

  constructor(private http: HttpClient) { }

  private handleError(res: HttpErrorResponse) {
    console.error(res.error);
    return observableThrowError(res.error || 'Server error');
  }

  getCounties(): Observable<Country[]> {
    return this.http
      .get<Country[]>(this.countriesUrl)
      .pipe(catchError(this.handleError));
  }

}
