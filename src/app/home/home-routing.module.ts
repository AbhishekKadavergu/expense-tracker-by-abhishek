import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from '../user/change-password/change-password.component';
import { DashboardComponent } from '../user/dashboard/dashboard.component';
import { ExpensesComponent } from '../user/expenses/expenses.component';
import { IncomesComponent } from '../user/incomes/incomes.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'expense', component: ExpensesComponent },
      { path: 'income', component: IncomesComponent },
      { path: 'changepwd', component: ChangePasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
