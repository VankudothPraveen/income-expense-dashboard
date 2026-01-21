import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Transaction } from '../models/transaction.model';

@Injectable({ providedIn: 'root' })
export class TransactionService {

  private api = 'http://localhost:3000/transactions';

  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  transactions$ = this.transactionsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAll();
  }

  loadAll(): void {
    this.http.get<Transaction[]>(this.api)
      .subscribe(data => this.transactionsSubject.next(data));
  }

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.api);
  }

  getByProperty(propertyId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.api}?propertyId=${propertyId}`);
  }

  getById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.api}/${id}`);
  }

  add(tx: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.api, tx).pipe(
      tap(() => this.loadAll())
    );
  }

  update(id: number, tx: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.api}/${id}`, tx).pipe(
      tap(() => this.loadAll())
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`).pipe(
      tap(() => this.loadAll())
    );
  }
}
