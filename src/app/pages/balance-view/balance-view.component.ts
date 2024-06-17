import { Component, OnInit } from '@angular/core';
import { Balance, BalanceService } from '../../services/balance.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-balance-view',
  standalone: true,
  imports: [NgFor],
  templateUrl: './balance-view.component.html',
  styleUrl: './balance-view.component.css',
})
export class BalanceViewComponent implements OnInit {
  balances: Balance[] = [];

  constructor(private balanceService: BalanceService) {}

  ngOnInit(): void {
    this.balanceService.getBalances().subscribe((data) => {
      this.balances = data;
    });
  }
}
