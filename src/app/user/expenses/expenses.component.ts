import { Component, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { RestCallsService } from 'src/app/services/rest-calls.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit {
  expenseForm: FormGroup;
  isSubmitted = false;

  userExpenses: any;
  expensesByDate: any;
  incomesByDate: any;
  showTable: boolean = false;
  // date2: Date = new Date("2002-12-09")
  date2: Date = new Date('2021-12-09T00:00:00.000Z');
  rangeDates: Date[];
  expCategories: any[];
  expenses: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
    private restCallSer: RestCallsService
  ) {
    this.expCategories = [
      { label: 'Clothing & footwear', value: 'Clothing & footwear' },
      { label: 'Communication', value: 'Communication' },
      { label: 'Debts', value: 'Debts' },
      { label: 'Education', value: 'Education' },
      { label: 'EMI', value: 'EMI' },
      { label: 'Gifts', value: 'Gifts' },
      { label: 'Groceries', value: 'Groceries' },
      { label: 'Health', value: 'Health' },
      { label: 'Home & Utilities', value: 'Home & Utilities' },
      { label: 'Hotel', value: 'Hotel' },
      { label: 'Miscellaneous', value: 'Miscellaneous' },
      { label: 'Pets', value: 'Pets' },
      { label: 'Sports', value: 'Sports' },
      { label: 'Transportation', value: 'Transportation' },
      { label: 'Others', value: 'Others' },
    ];
  }

  ngOnInit(): void {
    this.expenseForm = this.formBuilder.group({
      amount: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
    });
    console.log(new Date('2002-12-09T00:00:00.000Z'));
  }

  get formControls() {
    return this.expenseForm.controls;
  }

  async onSubmit() {
    this.isSubmitted = true;
    if (this.expenseForm.invalid) {
      return;
    }
    const expFormData = {
      amount: this.expenseForm.value.amount,
      category: this.expenseForm.value.category.value,
      date: this.expenseForm.value.date,
    };

    console.log(this.expenseForm.value);

    try {
      const expense = await this.restCallSer.addExpense(expFormData);

      if (!expense) {
        throw new Error();
      }
      console.log(expense);

      this.setUserMessages('success', 'Success', 'Expense added successfully');
      this.expenseForm.reset();
    } catch (error) {
      this.setUserMessages('error', 'Error', 'Something went wrong!');
      // this.expenseForm.reset();
      console.log(error);
    }
  }

  async getExpenses() {
    this.showTable = false;

    try {
      this.userExpenses = await this.restCallSer.getExpenses();
      if (!this.userExpenses) {
        throw new Error();
      }
      this.showTable = true;
      this.userExpenses = this.userExpenses.filter(
        (expense) => (expense.date = new Date(expense.date))
      );
      console.log(this.userExpenses);
    } catch (error) {
      this.showTable = false;
      this.setUserMessages('error', 'Error', 'Something went wrong!');
      console.warn(error);
    }
  }

  onRowEditInit(product) {
    console.log(product);
  }

  async onRowEditSave(expense) {
    console.log(expense);
    try {
      const updatedExp = await this.restCallSer.updateExpense(expense);
      if (!updatedExp) {
        throw new Error();
      }

      this.setUserMessages('success', 'Success', 'Record updated successfully');

      console.log(updatedExp);
    } catch (error) {
      this.setUserMessages('error', 'Error', 'Something went wrong!');
      console.log(error);
    }
  }

  onRowEditCancel(product: any, index: number) {
    console.log(product);
  }

  async onRowDlete(expense) {
    try {
      const delExpense = await this.restCallSer.deleteExpenseById(expense);
      if (!delExpense) {
        throw new Error();
      }
      console.log(delExpense);
      this.getExpenses();
      this.setUserMessages(
        'success',
        'Success',
        'Record deleted successfully.'
      );
    } catch (error) {
      this.setUserMessages('error', 'Error', 'Something went wrong!');
      console.warn(error);
    }
  }

  setUserMessages(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }

  getDetailsWithinRange() {
    this.getAllDetails(this.rangeDates[0], this.rangeDates[1]);
  }

  async getAllDetails(start: any, end: any) {
    this.showTable = false;

    this.userExpenses = [];
    try {
      const Expenses = await this.restCallSer.getExpensesByRange(start, end);

      if (!Expenses) {
        throw new Error();
      }
      // this.userExpenses =  Expenses;
      this.userExpenses = Expenses.sort(function (a: any, b: any) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return +new Date(a.date) - +new Date(b.date);
      });
      this.showTable = true;
    } catch (error) {
      console.warn('Error: ', error);
      this.setUserMessages('error', 'Error', error.error.message);
    }
  }
}
