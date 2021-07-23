import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { AuthGuardService } from './_helpers/auth-guard.service';
import { ExpensesComponent } from './user/expenses/expenses.component';
import { IncomesComponent } from './user/incomes/incomes.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      { path: 'expense', component: ExpensesComponent },
      { path: 'income', component: IncomesComponent },
    ],
  },
  { path: 'userReg', component: UserRegistrationComponent },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
