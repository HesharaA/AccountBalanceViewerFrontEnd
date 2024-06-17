import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Balance = {
  id: number;
  accountName: string;
  balance: number;
  balanceDate: Date;
};

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  private apiUrl = 'http://localhost:5258/api/balance';

  constructor(private http: HttpClient) {}

  getBalances(date: string): Observable<Balance[]> {
    return this.http.get<Balance[]>(this.apiUrl + '?date=' + date);
  }

  getDistinctBalances(): Observable<Date[]> {
    return this.http.get<Date[]>(this.apiUrl + '/distinct');
  }

  uploadBalanceFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }
}
