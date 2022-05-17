import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestCallsService {

  //user
  private loginURL = environment.API_URL + '/users/login';
  private logoutURL = environment.API_URL + '/users/logout';
  private change_PWD_URL = environment.API_URL + '/users/me/changepwd';
  private forgot_PWD_URL = environment.API_URL + '/users/forgotpwd';
  private set_PWD_URL = environment.API_URL + '/users/setpwd';
  private delete_avatar_URL = environment.API_URL + '/users/me/avatar';
  private user_URL = environment.API_URL + '/users/'



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
    return this.http.post(this.logoutURL, {}).toPromise();
  }
  
  changePassword(creds:any){
    return this.http.patch(this.change_PWD_URL,creds).toPromise()
  }

  getUserQuestion(email:any){
    return this.http.post(this.forgot_PWD_URL, email).toPromise()
  }

  setNewPassword(questionObj:any){
    return this.http.post(this.set_PWD_URL, questionObj).toPromise()
  }
  
  getUserAvatar(){
    return this.http.get(environment.API_URL+"/users/"+environment.userId+"/avatar", {responseType: 'blob'}).toPromise()
  }
  
  deleteUserAvatar(){
    return this.http.delete(this.delete_avatar_URL).toPromise()
  }
  


  //Expense related methods
  addExpense(value) {
    return this.http.post(this.addExpURL, value).toPromise();
  }

  getExpenses() {
    return this.http.get(this.getAllExpnsURL).toPromise();
  }

  getExpensesByRange(start: any = undefined, end: any = undefined) {
    var firstDay;
    var today;
    if (start === undefined || end === undefined) {
      var date = new Date(),
        y = date.getFullYear(),
        m = date.getMonth();
      firstDay = new Date(y, m, 1);
      today = new Date(y, m+1, 0);
    } else {
      firstDay = start;
      today = end;
    }

    const httpOptions = {
      params: new HttpParams()
        .set('start', firstDay.toLocaleDateString())
        .set('end', today.toLocaleDateString()),
    };

    return this.http
      .get<any>(environment.API_URL + '/expenses/data/dates', httpOptions)
      .toPromise();
  }

  updateExpense(expense) {
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
    return this.http
      .delete(this.deleteExpByIdURL + expense._id)
      .toPromise();
  }

  //Income related methods
  addIncome(value) {
    return this.http
      .post(this.addIncomeURL, value)
      .toPromise();
  }

  getIncomes() {
    return this.http.get(this.getAllIncmsURL).toPromise();
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
      params: new HttpParams()
        .set('start', firstDay.toLocaleDateString())
        .set('end', today.toLocaleDateString()),
    };

    return this.http
      .get<any>(environment.API_URL + '/Incomes/data/dates', httpOptions)
      .toPromise();
  }

  updateIncome(income) {

    return this.http
      .patch(
        this.updateIncURL + income._id,
        {
          category: income.category,
          amount: income.amount,
          date: income.date,
        }
      )
      .toPromise();
  }

  deleteIncomeById(income) {
    return this.http
      .delete(this.deleteIncByIdURL + income._id)
      .toPromise();
  }
}
