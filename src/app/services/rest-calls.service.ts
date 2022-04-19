import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestCallsService {
  private loginURL = environment.API_URL + '/users/login';
  private logoutURL = environment.API_URL + '/users/logout';

  //Expense URL
  private addExpURL = environment.API_URL + '/expenses';
  private getAllExpnsURL = environment.API_URL + '/expenses';
  private updateExpenseURL = environment.API_URL + '/expenses/';
  private deleteExpByIdURL = environment.API_URL + '/expenses/';

  //Income URL
  private addIncomeURL = environment.API_URL + '/incomes';
  private getAllIncmsURL = environment.API_URL + '/incomes';
  private updateIncURL = environment.API_URL + '/incomes/';
  private deleteIncByIdURL = environment.API_URL + '/incomes/';

  private httpOptions = {};
  public expCategories: any[];
  public incomeCategories: any[];

  constructor(private http: HttpClient) {

  }

  login(value) {
    return this.http.post(this.loginURL, value).toPromise();
  }

  logOut() {
    console.log('Logged out!');
    this.setHeaders();
    return this.http.post(this.logoutURL, {}, this.httpOptions).toPromise();
  }

  setHeaders() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + environment.token,
      }),
    };
  }

  //Expense related methods
  addExpense(value) {
    this.setHeaders();
    return this.http.post(this.addExpURL, value, this.httpOptions).toPromise();
  }

  getExpenses() {
    this.setHeaders();
    return this.http.get(this.getAllExpnsURL, this.httpOptions).toPromise();
  }

  getExpensesByRange(start: any = undefined, end: any = undefined) {
    var firstDay;
    var today;
    if (start === undefined || end === undefined) {
      var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
      firstDay = new Date(y, m, 1);
      today = new Date();
    } else {
      firstDay = start;
      today = end;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + environment.token,
      }),
      params: new HttpParams()
        .set('start', firstDay.toLocaleDateString())
        .set('end', today.toLocaleDateString()),
    };

    return this.http
      .get<any>(environment.API_URL + '/expenses/data/dates', httpOptions)
      .toPromise();
  }

  updateExpense(expense) {
    this.setHeaders();

    return this.http
      .patch(
        this.updateExpenseURL + expense._id,
        {
          category: expense.category,
          amount: expense.amount,
          date: expense.date,
        },
        this.httpOptions
      )
      .toPromise();
  }

  deleteExpenseById(expense) {
    this.setHeaders();
    return this.http
      .delete(this.deleteExpByIdURL + expense._id, this.httpOptions)
      .toPromise();
  }

  //Income related methods
  addIncome(value) {
    this.setHeaders();
    return this.http
      .post(this.addIncomeURL, value, this.httpOptions)
      .toPromise();
  }

  getIncomes() {
    this.setHeaders();
    return this.http.get(this.getAllIncmsURL, this.httpOptions).toPromise();
  }

  getIncomesByRange(start: any = undefined, end: any = undefined) {
    if (start === undefined || end === undefined) {
      var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
      var firstDay = new Date(y, m, 1);
      var today = new Date();
    } else {
      firstDay = start;
      today = end;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + environment.token,
      }),
      params: new HttpParams()
        .set('start', firstDay.toLocaleDateString())
        .set('end', today.toLocaleDateString()),
    };

    return this.http
      .get<any>(environment.API_URL + '/Incomes/data/dates', httpOptions)
      .toPromise();
  }

  updateIncome(income) {
    this.setHeaders();

    return this.http
      .patch(
        this.updateIncURL + income._id,
        {
          category: income.category,
          amount: income.amount,
          date: income.date,
        },
        this.httpOptions
      )
      .toPromise();
  }

  deleteIncomeById(income) {
    this.setHeaders();
    return this.http
      .delete(this.deleteIncByIdURL + income._id, this.httpOptions)
      .toPromise();
  }
}
