import { Component, OnInit } from '@angular/core';
import { Balance, BalanceService } from '../../services/balance.service';
import { NgFor } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
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
  dateParam: any = null;
  loading: boolean = true;

  constructor(
    private balanceService: BalanceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.date = params['date'];
      this.dateParam = Date.parse(this.date);
    });

    if (!this.isDateValid()) {
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
    return isNaN(this.dateParam) === false;
  }
}
