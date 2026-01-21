import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  standalone: true,
  selector: 'app-transaction-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './transaction-list.html',
  styleUrl: './transaction-list.css'
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[] = [];
  propertyName = '';

  constructor(
    private route: ActivatedRoute,
    private service: TransactionService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const prop = params.get('property');
      const id = prop === 'earthy' ? 1 : 2;

      this.propertyName = id === 1 ? 'Earthy Escape' : 'Millennium Farm House';

      this.service.getByProperty(id).subscribe(data => {
        this.transactions = data.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      });
    });
  }

  deleteTransaction(id: number): void {
    this.service.delete(id).subscribe();
  }
}
