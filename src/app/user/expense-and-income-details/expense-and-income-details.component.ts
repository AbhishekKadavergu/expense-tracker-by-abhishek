import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
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
  startDate: Date;
  endDate: Date;

  cols: any[] = [];

  constructor(
    private restCallSer: RestCallsService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    console.log(this.config);
    this.startDate = this.config.data?.start;
    this.endDate = this.config.data?.end;
    // this.getAllDetails(this.startDate, this.endDate);
    this.getTotalIncomesAndExpense();
    this.cols = [
      { field: 'date', header: 'Date' },
      { field: 'category', header: 'Category' },
      { field: 'amount', header: 'Amount' },
    ];
  }

  // async getAllDetails(start: any, end: any) {
  //   this.expenses = [];
  //   this.incomes = [];
  //   try {
  //     this.expenses = await this.restCallSer.getExpensesByRange(start, end);
  //     if (!this.expenses) {
  //       throw new Error();
  //     }

  //     this.expenses.forEach((element) => {
  //       element.flag = 0;
  //     });

  //     this.incomes = await this.restCallSer.getIncomesByRange(start, end);
  //     if (!this.incomes) {
  //       throw new Error();
  //     }
  //     this.incomes.forEach((element) => {
  //       element.flag = 1;
  //     });
  //   } catch (error) {
  //     console.warn('Error: ', error);
  //   } finally {
  //     this.allDetails = [...this.expenses, ...this.incomes].sort((a, b) => +new Date(a.date) - +new Date(b.date));

  //     this.balance =
  //       this.incomes.reduce((abc, cur) => {
  //         return abc + cur.amount;
  //       }, 0) -
  //       this.expenses.reduce((abc, cur) => {
  //         return abc + cur.amount;
  //       }, 0);
  //     console.log(this.allDetails);
  //   }
  // }

  async getTotalIncomesAndExpense() {
    try {
      const expenses = await this.getExpenses(this.startDate, this.endDate);
      const incomes = await this.getIncomes(this.startDate, this.endDate);

      this.allDetails = [...expenses, ...incomes].sort(
        (a, b) => +new Date(a.date) - +new Date(b.date)
      );

      this.balance =
        incomes.reduce((abc, cur) => {
          return abc + cur.amount;
        }, 0) -
        expenses.reduce((abc, cur) => {
          return abc + cur.amount;
        }, 0);

      if (expenses.length === 0 && incomes.length === 0) {
        this.cols = [];
      }

      console.log(this.balance);
    } catch (error) {}
  }

  async getExpenses(start: any, end: any) {
    try {
      this.expenses = await this.restCallSer.getExpensesByRange(start, end);
      if (!this.expenses) {
        throw new Error();
      }

      this.expenses.forEach((element) => {
        element.flag = 0;
      });

      return this.expenses;
    } catch (error) {
      if (error.status === 404) {
        this.expenses = [];
        return this.expenses;
      }
    }
  }

  async getIncomes(start: any, end: any) {
    try {
      this.incomes = await this.restCallSer.getIncomesByRange(start, end);
      if (!this.incomes) {
        throw new Error();
      }

      this.incomes.forEach((element) => {
        element.flag = 1;
      });
      return this.incomes;
    } catch (error) {
      if (error.status === 404) {
        this.incomes = [];
        return this.incomes;
      }
    }
  }

  // getDetailsWithinRange() {
  //   this.getAllDetails(this.rangeDates[0], this.rangeDates[1]);
  // }
}
