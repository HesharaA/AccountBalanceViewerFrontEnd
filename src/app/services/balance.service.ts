import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type Balance = {
  id: number;
  accountName: string;
  balance: number;
  balanceDate: Date;
};

/**
 * @description
 * The BalanceService provides methods to interact with the balance-related endpoints of the API.
 * It includes functionality to fetch balances, distinct balance dates, and upload balance files.
 */
@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  /**
   * @description The base URL for the balance-related API endpoints.
   * @private
   */
  private apiUrl = 'http://localhost:5258/api/balance';

  /**
   * @param {HttpClient} http - The HttpClient used to make HTTP requests.
   */
  constructor(private http: HttpClient) {}

  /**
   * @description Fetches the balances for a specific date.
   * @param {string} date - The date for which to fetch the balances.
   * @returns {Observable<Balance[]>} An observable containing an array of balances.
   */
  getBalances(date: string): Observable<Balance[]> {
    return this.http.get<Balance[]>(this.apiUrl + '?date=' + date);
  }

  /**
   * @description Fetches a list of distinct balance dates.
   * @returns {Observable<Date[]>} An observable containing an array of distinct balance dates.
   */
  getDistinctBalances(): Observable<Date[]> {
    return this.http.get<Date[]>(this.apiUrl + '/distinct');
  }

  /**
   * @description Uploads a balance file to the server.
   * @param {File} file - The balance file to be uploaded.
   * @returns {Observable<Balance[]>} An observable containing the all the balances added to the database.
   */
  uploadBalanceFile(file: File): Observable<Balance[]> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<Balance[]>(`${this.apiUrl}/upload`, formData);
  }
}
