import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

Chart.register(...registerables);

@Component({
  selector: 'app-expense-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expense-dashboard.component.html',
  styleUrls: ['./expense-dashboard.component.css']
})
export class ExpenseDashboardComponent
  implements OnInit, AfterViewInit, OnDestroy {

  totalExpense = 0;
  earthyExpense = 0;
  millenniumExpense = 0;

  // ✅ TABLE DATA
  expenseTransactions: Transaction[] = [];

  private chart!: Chart;
  private expenseData: number[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.transactions$.subscribe(data => {
      const expenses = data.filter(t => t.type === 'expense');

      this.calculate(expenses);

      // ✅ prepare table data (latest first)
      this.expenseTransactions = expenses
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);

      this.expenseData = [this.earthyExpense, this.millenniumExpense];
      this.renderChart();
    });
  }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  private calculate(data: Transaction[]): void {
    this.totalExpense = this.earthyExpense = this.millenniumExpense = 0;

    data.forEach(t => {
      this.totalExpense += t.amount;
      if (t.propertyId === 1) this.earthyExpense += t.amount;
      if (t.propertyId === 2) this.millenniumExpense += t.amount;
    });
  }

  private renderChart(): void {
    const canvas = document.getElementById('expenseChart') as HTMLCanvasElement;
    if (!canvas || this.expenseData.length === 0) return;

    this.chart?.destroy();

    this.chart = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Earthy Escape', 'Millennium Farm House'],
        datasets: [{
          data: this.expenseData,
          backgroundColor: ['#ef4444', '#6366f1']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
