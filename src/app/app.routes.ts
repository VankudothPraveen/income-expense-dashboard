import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

// Components
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IncomeDashboardComponent } from './components/income-dashboard/income-dashboard.component';
import { ExpenseDashboardComponent } from './components/expense-dashboard/expense-dashboard.component';

import { TransactionListComponent } from './components/transaction-list/transaction-list';
import { AddTransactionComponent } from './components/add-transaction/add-transaction';
import { EditTransactionComponent } from './components/edit-transaction/edit-transaction.component';

export const routes: Routes = [

  // 🔓 PUBLIC LOGIN
  { path: 'login', component: LoginComponent },

  // 🔐 PROTECTED PAGES
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'income-dashboard', component: IncomeDashboardComponent, canActivate: [AuthGuard] },
  { path: 'expense-dashboard', component: ExpenseDashboardComponent, canActivate: [AuthGuard] },
  
  { path: 'transactions/:property', component: TransactionListComponent, canActivate: [AuthGuard] },
  { path: 'add', component: AddTransactionComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EditTransactionComponent, canActivate: [AuthGuard] },

  // 🔁 DEFAULT → LOGIN
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 🔁 FALLBACK
  { path: '**', redirectTo: 'login' }
];
