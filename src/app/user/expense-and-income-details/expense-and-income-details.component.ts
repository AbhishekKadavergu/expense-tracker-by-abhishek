import { Component, OnInit } from '@angular/core';
import { RestCallsService } from 'src/app/services/rest-calls.service';

@Component({
  selector: 'app-expense-and-income-details',
  templateUrl: './expense-and-income-details.component.html',
  styleUrls: ['./expense-and-income-details.component.css'],
})
export class ExpenseAndIncomeDetailsComponent implements OnInit {
  allDetails: any;
  rangeDates: Date[];
  balance: number = 0;
  expenses: any;
  incomes: any;

  constructor(private restCallSer: RestCallsService) {}

  ngOnInit(): void {
    this.getAllDetails(undefined, undefined);
  }

  async getAllDetails(start: any, end: any) {
    this.expenses = [];
    this.incomes = [];
    try {
      this.expenses = await this.restCallSer.getExpensesByRange(start, end);
      if (!this.expenses) {
        throw new Error();
      }

      this.expenses.forEach((element) => {
        element.flag = 0;
      });

      this.incomes = await this.restCallSer.getIncomesByRange(start, end);
      if (!this.incomes) {
        throw new Error();
      }
      this.incomes.forEach((element) => {
        element.flag = 1;
      });
    } catch (error) {
      console.warn('Error: ', error);
    } finally {
      this.allDetails = [...this.expenses, ...this.incomes].sort((a, b)=> +new Date(a.date)- +new Date(b.date));
      this.balance =
        this.incomes.reduce((abc, cur) => {
          return abc + cur.amount;
        }, 0) -
        this.expenses.reduce((abc, cur) => {
          return abc + cur.amount;
        }, 0);
      console.log(this.allDetails);
    }
  }

  getDetailsWithinRange() {
    this.getAllDetails(this.rangeDates[0], this.rangeDates[1]);
  }
}
