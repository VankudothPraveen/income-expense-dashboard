import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-transaction.html',
  styleUrls: ['./add-transaction.css']
})
export class AddTransactionComponent {
  transactionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private router: Router
  ) {
    this.transactionForm = this.fb.group({
      type: ['income', Validators.required],
      propertyId: [1, Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      date: ['', Validators.required],
      description: ['']
    });
  }

  submit(): void {
    if (this.transactionForm.invalid) {
      this.transactionForm.markAllAsTouched();
      return;
    }

    this.transactionService.add(this.transactionForm.value as any)
      .subscribe(() => {
        this.router.navigate(['/transactions']);
      });
  }
}
