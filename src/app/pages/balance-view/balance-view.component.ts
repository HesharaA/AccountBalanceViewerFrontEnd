import { Component, OnInit } from '@angular/core';
import { Balance, BalanceService } from '../../services/balance.service';
import { NgFor } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-balance-view',
  standalone: true,
  templateUrl: './balance-view.component.html',
  styleUrl: './balance-view.component.css',
  imports: [NgFor, CardComponent, CommonModule],
})
export class BalanceViewComponent implements OnInit {
  balances: Balance[] = [];
  date: string = '';
  dateParam: any = null;

  constructor(
    private balanceService: BalanceService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.date = params['date'];
      this.dateParam = Date.parse(this.date);
    });

    if (!this.isDateValid) {
      window.alert('Invalid date provided');
    }
  }

  ngOnInit(): void {
    if (this.isDateValid) {
      this.balanceService.getBalances(this.date).subscribe({
        error: (e) => {
          window.alert(e.error);
        },
        next: (data) => {
          this.balances = data;
        },
      });
    }
  }

  get isDateValid() {
    return isNaN(this.dateParam) === false;
  }
}
