import { Component, OnInit } from '@angular/core';
import { Balance, BalanceService } from '../../services/balance.service';
import { NgFor } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-balance-view',
  standalone: true,
  templateUrl: './balance-view.component.html',
  styleUrl: './balance-view.component.css',
  imports: [NgFor, CardComponent, CommonModule],
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
