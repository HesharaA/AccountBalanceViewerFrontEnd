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

  getBalances(): Observable<Balance[]> {
    return this.http.get<Balance[]>(this.apiUrl + '?date=2024.03.01');
  }

  uploadBalanceFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/upload`, formData);
  }
}
