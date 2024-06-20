import { Component, OnInit } from '@angular/core';
import { Balance, BalanceService } from '../../services/balance.service';
import { NgFor } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  date: string = '';
  loading: boolean = true;

  constructor(
    private balanceService: BalanceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.date = params['date'];
    });

    if (!this.date) {
      this.date = new Date().toISOString();
      const queryParams: Params = { date: this.date };

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams,
      });
    } else if (!this.isDateValid()) {
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
