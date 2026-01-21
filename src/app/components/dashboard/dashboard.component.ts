import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription, combineLatest } from 'rxjs';
import { Chart, registerables } from 'chart.js';

import { TransactionService } from '../../services/transaction.service';
import { PropertyService } from '../../services/property.service';
import { Transaction } from '../../models/transaction.model';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  totalIncome = 0;
  totalExpense = 0;
  netProfit = 0;

  earthyIncome = 0;
  earthyExpense = 0;
  millenniumIncome = 0;
  millenniumExpense = 0;

  bestProperty = '—';

  earthyLatest: Transaction[] = [];
  millenniumLatest: Transaction[] = [];

  private sub!: Subscription;

  private incomeExpenseChart!: Chart;
  private expensePieChart!: Chart;
  private profitCompareChart!: Chart;

  constructor(
    private txService: TransactionService,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.txService.loadAll();

    this.sub = combineLatest([
      this.txService.transactions$,
      this.propertyService.selectedPropertyId$
    ]).subscribe(([transactions]) => {
      this.calculate(transactions);
      this.prepareLatest(transactions);
      this.calculateBestProperty();
      this.renderCharts();
    });
  }

  ngAfterViewInit(): void {
    this.renderCharts();
  }

  private calculate(transactions: Transaction[]): void {
    this.totalIncome = this.totalExpense = 0;
    this.earthyIncome = this.earthyExpense = 0;
    this.millenniumIncome = this.millenniumExpense = 0;

    transactions.forEach(t => {
      t.type === 'income'
        ? this.totalIncome += t.amount
        : this.totalExpense += t.amount;

      if (t.propertyId === 1) {
        t.type === 'income'
          ? this.earthyIncome += t.amount
          : this.earthyExpense += t.amount;
      }

      if (t.propertyId === 2) {
        t.type === 'income'
          ? this.millenniumIncome += t.amount
          : this.millenniumExpense += t.amount;
      }
    });

    this.netProfit = this.totalIncome - this.totalExpense;
  }

  private calculateBestProperty(): void {
    const earthyProfit = this.earthyIncome - this.earthyExpense;
    const millenniumProfit = this.millenniumIncome - this.millenniumExpense;

    this.bestProperty =
      earthyProfit > millenniumProfit
        ? 'Earthy Escape'
        : millenniumProfit > earthyProfit
        ? 'Millennium Farm House'
        : 'Both Equal';
  }

  private prepareLatest(transactions: Transaction[]): void {
    const sorted = [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    this.earthyLatest = sorted.filter(t => t.propertyId === 1).slice(0, 5);
    this.millenniumLatest = sorted.filter(t => t.propertyId === 2).slice(0, 5);
  }

  private renderCharts(): void {
    this.incomeExpenseChart?.destroy();
    this.expensePieChart?.destroy();
    this.profitCompareChart?.destroy();

    const bar = document.getElementById('incomeExpenseBar') as HTMLCanvasElement;
    const pie = document.getElementById('expensePie') as HTMLCanvasElement;
    const compare = document.getElementById('profitCompare') as HTMLCanvasElement;

    if (!bar || !pie || !compare) return;

    this.incomeExpenseChart = new Chart(bar, {
      type: 'bar',
      data: {
        labels: ['Income', 'Expense'],
        datasets: [{
          data: [this.totalIncome, this.totalExpense],
          backgroundColor: ['#22c55e', '#ef4444']
        }]
      }
    });

    this.expensePieChart = new Chart(pie, {
      type: 'pie',
      data: {
        labels: ['Earthy Expense', 'Millennium Expense'],
        datasets: [{
          data: [this.earthyExpense, this.millenniumExpense],
          backgroundColor: ['#f59e0b', '#6366f1']
        }]
      }
    });

    this.profitCompareChart = new Chart(compare, {
      type: 'bar',
      data: {
        labels: ['Earthy Escape', 'Millennium Farm House'],
        datasets: [{
          data: [
            this.earthyIncome - this.earthyExpense,
            this.millenniumIncome - this.millenniumExpense
          ],
          backgroundColor: ['#10b981', '#3b82f6']
        }]
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.incomeExpenseChart?.destroy();
    this.expensePieChart?.destroy();
    this.profitCompareChart?.destroy();
  }
}
