import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-edit-transaction',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {

  loading = true;
  id!: number;

  form = new FormGroup({
    propertyId: new FormControl(1, Validators.required),
    type: new FormControl('income', Validators.required),
    category: new FormControl('', Validators.required),
    amount: new FormControl(0, [Validators.required, Validators.min(1)]),
    date: new FormControl('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TransactionService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getById(this.id).subscribe(tx => {
      this.form.patchValue(tx);
      this.loading = false;
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    const payload = {
      id: this.id,
      ...this.form.getRawValue()
    };

    this.service.update(this.id, payload as any).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}
