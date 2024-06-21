import { Component, OnInit } from '@angular/core';
import { Balance, BalanceService } from '../../services/balance.service';
import { NgFor } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../components/loader/loader.component';
import { handleHttpError } from '../../utils/error-handler';

@Component({
  selector: 'app-balance-view',
  standalone: true,
  templateUrl: './balance-view.component.html',
  styleUrl: './balance-view.component.css',
  imports: [NgFor, CardComponent, CommonModule, LoaderComponent],
})
export class BalanceViewComponent implements OnInit {
  balances: Balance[] = [];
  loading: boolean = true;

  get date(): string {
    const queryParams = this.router.routerState.snapshot.root.queryParams;
    return queryParams['date'];
  }

  constructor(private balanceService: BalanceService, private router: Router) {}

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

  isDateValid(): boolean {
    return isNaN(Date.parse(this.date)) === false;
  }
}
