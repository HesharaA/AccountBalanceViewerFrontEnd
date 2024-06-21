import { Component, OnInit } from '@angular/core';
import { Balance, BalanceService } from '../../services/balance.service';
import { NgFor } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../components/loader/loader.component';
import { handleHttpError } from '../../utils/error-handler';

/**
 * @description
 * The BalanceViewComponent is responsible for displaying a list of balances for a specific date.
 * It retrieves the date from the query parameters and fetches the corresponding balances from
 * the BalanceService. It also handles loading state and error handling.
 */
@Component({
  selector: 'app-balance-view',
  standalone: true,
  templateUrl: './balance-view.component.html',
  styleUrl: './balance-view.component.css',
  imports: [NgFor, CardComponent, CommonModule, LoaderComponent],
})
export class BalanceViewComponent implements OnInit {
  /**
   * @description An array of balances fetched from the server for the specified date.
   */
  balances: Balance[] = [];

  /**
   * @description A flag indicating if the loading view should be displayed.
   */
  loading: boolean = true;

  /**
   * @param {BalanceService} balanceService - The service to handle balance-related operations.
   * @param {Router} router - The router service for navigation and accessing query parameters.
   */
  constructor(private balanceService: BalanceService, private router: Router) {}

  /**
   * @description Initializes the component by checking the date query parameter and fetching the balances for that date.
   */
  ngOnInit(): void {
    if (!this.date) {
      const queryParams = { date: new Date().toISOString() };
      this.router.navigate(['balances'], {
        queryParams: queryParams,
      });
      this.loading = false;
    }

    if (!this.isDateValid() && this.date) {
      window.alert('Invalid date provided');
      this.loading = false;
    }

    if (this.isDateValid()) {
      this.balanceService.getBalances(this.date).subscribe({
        error: (e) => {
          this.loading = false;
          handleHttpError(e);
        },
        next: (data) => {
          this.balances = data;
          this.loading = false;
        },
      });
    }
  }

  /**
   * @description Checks if the provided date query parameter is a valid date.
   * @returns {boolean} - True if the date is valid, false otherwise.
   */
  isDateValid(): boolean {
    return isNaN(Date.parse(this.date)) === false;
  }

  /**
   * @description Retrieves the date query parameter from the router's state.
   * @returns {string} - The date query parameter.
   */
  get date(): string {
    const queryParams = this.router.routerState.snapshot.root.queryParams;
    return queryParams['date'];
  }
}
