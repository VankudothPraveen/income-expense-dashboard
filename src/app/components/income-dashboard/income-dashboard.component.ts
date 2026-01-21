import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

Chart.register(...registerables);

@Component({
  selector: 'app-income-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './income-dashboard.component.html',
  styleUrls: ['./income-dashboard.component.css']
})
export class IncomeDashboardComponent
  implements OnInit, AfterViewInit, OnDestroy {

  totalIncome = 0;
  earthyIncome = 0;
  millenniumIncome = 0;

  // ✅ TABLE DATA
  incomeTransactions: Transaction[] = [];

  private chart!: Chart;
  private incomeData: number[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.transactionService.transactions$.subscribe(data => {
      const incomes = data.filter(t => t.type === 'income');

      this.calculate(incomes);

      // ✅ prepare table data (latest first)
      this.incomeTransactions = incomes
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10);

      this.incomeData = [this.earthyIncome, this.millenniumIncome];
      this.renderChart();
    });
  }

  ngAfterViewInit(): void {
    this.renderChart();
  }

  private calculate(data: Transaction[]): void {
    this.totalIncome = this.earthyIncome = this.millenniumIncome = 0;

    data.forEach(t => {
      this.totalIncome += t.amount;
      if (t.propertyId === 1) this.earthyIncome += t.amount;
      if (t.propertyId === 2) this.millenniumIncome += t.amount;
    });
  }

  private renderChart(): void {
    const canvas = document.getElementById('incomeChart') as HTMLCanvasElement;
    if (!canvas || this.incomeData.length === 0) return;

    this.chart?.destroy();

    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Earthy Escape', 'Millennium Farm House'],
        datasets: [{
          label: 'Income',
          data: this.incomeData,
          backgroundColor: ['#22c55e', '#6366f1']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
