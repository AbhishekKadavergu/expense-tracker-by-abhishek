import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { RestCallsService } from 'src/app/services/rest-calls.service';
@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.css'],
})
export class IncomesComponent implements OnInit {
  incomeForm: FormGroup;
  isSubmitted = false;

  userIncomes: any;
  showTable: boolean = false;
  // date2: Date = new Date("2002-12-09")
  date2: Date = new Date('2021-12-09T00:00:00.000Z');
  incomeCategories: any[];

  rangeDates: Date[];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
    private restCallSer: RestCallsService
  ) {
    this.incomeCategories = [
      { name: 'Salary income', code: 'Salary income' },
      { name: 'Profits income', code: 'Profits income' },
      { name: 'Interest income', code: 'Interest income' },
      { name: 'Dividend income', code: 'Dividend income' },
      { name: 'Rental income', code: 'Rental income' },
      { name: 'Capital Gains', code: 'Capital Gains' },
      { name: 'Royalty income', code: 'Royalty income' },
      { name: 'Miscellaneous', code: 'Miscellaneous' },
      { name: 'Others', code: 'Others' },
    ];
  }

  ngOnInit(): void {
    this.incomeForm = this.formBuilder.group({
      amount: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
    });
    console.log(new Date('2002-12-09T00:00:00.000Z'));
  }

  get formControls() {
    return this.incomeForm.controls;
  }

  async onSubmit() {
    this.isSubmitted = true;
    if (this.incomeForm.invalid) {
      return;
    }
    console.log(this.incomeForm.value);
    const incFormData = {
      amount: this.incomeForm.value.amount,
      category: this.incomeForm.value.category.name,
      date: this.incomeForm.value.date,
    };

    try {
      const income = await this.restCallSer.addIncome(incFormData);
      console.log(income);
      if (!income) {
        throw new Error();
      }

      this.setUserMessages('success', 'Success', 'Income added successfully');
      this.incomeForm.reset();
    } catch (error) {
      this.setUserMessages('error', 'Error', 'Something went wrong!');
      console.warn(error);
    }
  }

  async getIncomes() {
    this.showTable = false;
    try {
      this.userIncomes = await this.restCallSer.getIncomes();
      if (!this.userIncomes) {
        throw new Error();
      }
      this.showTable = true;
      this.userIncomes = this.userIncomes.filter(
        (income) => (income.date = new Date(income.date))
      );
      console.log(this.userIncomes);
    } catch (error) {
      this.showTable = false;
      if (error.status === 404) {
        return this.setUserMessages('error', 'Error', 'No records found!');
      }

      this.setUserMessages('error', 'Error', 'Something went wrong!');

      console.warn(error);
    }
  }

  onRowEditInit(product) {
    console.log(product);
  }

  async onRowEditSave(income) {
    console.log(income);
    try {
      const updatedExp = await this.restCallSer.updateIncome(income);
      if (!updatedExp) {
        throw new Error();
      }

      this.setUserMessages('success', 'Success', 'Record updated successfully');
      console.log(updatedExp);
    } catch (error) {
      this.setUserMessages('error', 'Error', 'Something went wrong!');
      console.warn(error);
    }
  }

  onRowEditCancel(product: any, index: number) {
    console.log(product);
  }

  async onRowDlete(income) {
    try {
      const delIncome = await this.restCallSer.deleteIncomeById(income);
      if (!delIncome) {
        throw new Error();
      }
      console.log(delIncome);
      this.getIncomes();

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
    this.getIncomesByRange(this.rangeDates[0], this.rangeDates[1]);
  }

  async getIncomesByRange(start: any, end: any) {
    this.showTable = false;

    this.userIncomes = [];
    try {
      const Incomes = await this.restCallSer.getIncomesByRange(start, end);

      if (!Incomes) {
        throw new Error();
      }
      // this.userExpenses =  Expenses;
      this.userIncomes = Incomes.sort(function (a: any, b: any) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return +new Date(a.date) - +new Date(b.date);
      });
      this.showTable = true;
    } catch (error) {
      console.warn('Error: ', error);
      this.setUserMessages('error', 'Error', 'Something went wrong!');
    }
  }
}
