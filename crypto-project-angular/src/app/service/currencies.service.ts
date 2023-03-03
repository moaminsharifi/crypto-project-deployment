import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from 'environment';
import { Observable } from 'rxjs';
import { Currency } from '../interface/currency';
import { InsertCurrency } from '../interface/insert-currency';
import { UpdateCurrency } from '../interface/update-currency';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  constructor(private http: HttpClient) {}

  // Get All Currencies from DB
  test(): Observable<any> {
    return this.http.get<any>('https://jsonplaceholder.typi34code.com/todos/1');
  }

  // Get All Currencies from DB
  getAllCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(
      Environment.shared.apiBaseUrl + '/crypto-currencies'
    );
  }

  // Get Specified Currency from DB
  getOnesCurrencies(id: number): Observable<Currency> {
    return this.http.get<Currency>(
      Environment.shared.apiBaseUrl + '/crypto-currencies/' + id
    );
  }

  // Insert Currency to DB
  insertCurrency(currency: InsertCurrency): Observable<Currency> {
    return this.http.post<Currency>(
      Environment.shared.apiBaseUrl + '/crypto-currencies/',
      currency
    );
  }

  // Update Currency
  updateCurrency(id: number, currency: UpdateCurrency): Observable<Currency> {
    return this.http.patch<Currency>(
      Environment.shared.apiBaseUrl + '/crypto-currencies/' + id,
      currency
    );
  }

  // Delete Currency
  deleteCurrency(id: number): Observable<Currency> {
    return this.http.delete<Currency>(
      Environment.shared.apiBaseUrl + '/crypto-currencies/' + id
    );
  }
}
