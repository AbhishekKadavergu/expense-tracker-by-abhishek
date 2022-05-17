import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { RestCallsService } from 'src/app/services/rest-calls.service';
import { Categories } from './expenseCategories';
import { UtilityService } from 'src/app/services/utility.service';


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
  expCategories: Categories[];
  expenses: any;



  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private restCallSer: RestCallsService,
    private utSer: UtilityService,
  ) {
    this.expCategories = utSer.getExpCategories()
  }

  ngOnInit(): void {
    this.expenseForm = this.formBuilder.group({
      amount: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
    });
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
      this.userExpenses = Expenses.filter(expense=> expense.date = new Date(expense.date));
      this.showTable = true;
    } catch (error) {
      console.warn('Error: ', error);
      this.setUserMessages('error', 'Error', error.error.message);
    }
  }


}
