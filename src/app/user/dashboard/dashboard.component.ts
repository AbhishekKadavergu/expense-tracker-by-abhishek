import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

import { RestCallsService } from 'src/app/services/rest-calls.service';
import { Product } from './product';
import { ExpenseAndIncomeDetailsComponent } from '../expense-and-income-details/expense-and-income-details.component';
import { UtilityService } from 'src/app/services/utility.service';

interface City {
  name: string,
  code: string
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DialogService, MessageService],
})
export class DashboardComponent implements OnInit {
  expenses = [];
  incomes = [];
  data: any;
  IncomeData: any;
  totalExpense: number;
  totalIncome: number;
  ref: DynamicDialogRef;
  timeOptions: City[];
  selectedTime: City;

  // years: City[] = [];
  selectedYear: Date;
  rangeDates: Date[];
  monthly: Date = new Date()

  startDay: Date
  endDay: Date



  constructor(
    private restCallSer: RestCallsService,
    private utSer: UtilityService,
    private router: Router,
    private route: ActivatedRoute,
    public dialogService: DialogService,
    public messageService: MessageService
  ) {
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var m_names = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    this.timeOptions = [
      { name: 'Monthly', code: 'monthly' },
      { name: 'Yearly', code: 'yearly' },
      { name: 'Period', code: 'period' }
    ];

    this.selectedTime = { name: 'Monthly', code: 'monthly' }
    var y = this.monthly.getFullYear(), m = this.monthly.getMonth();
    this.startDay = new Date(y, m, 1);
    this.endDay = new Date(y, m + 1, 0);
  }

  ngOnInit(): void {
    this.getAllExpenses();
    this.getAllIncomes();
  }


  async getAllExpenses(start: any = undefined, end: any = undefined) {
    try {
      const expenses = await this.restCallSer.getExpensesByRange(start, end);
      if (!expenses) {
        throw new Error();
      }

      this.expenses = expenses;
      var chartExp = [];
      this.utSer.getExpCategories().forEach((category) => {
        let amt = 0;
        let label = null;

        this.expenses.forEach((exp) => {
          if (exp.category === category.label) {
            amt += exp.amount;
            label = exp.category;
          }
        });
        if (label === null) {
          return;
        }
        chartExp.push({
          category: label,
          amount: amt,
          color: this.utSer.getExpCategories().find(cat => cat.label === label).color
        });
      });
      console.log(chartExp);
      this.totalExpense = this.expenses.reduce((abc, cur) => {
        return abc + cur.amount;
      }, 0);
      this.createExpDoughnutChart(chartExp);
      console.log(this.expenses);
    } catch (error) {
      if (error.status === 404) {
        this.expenses = []
        this.totalExpense = 0;
      }
      console.warn(error);
      console.warn(error.status);
    }
  }

  async getAllIncomes(start: any = undefined, end: any = undefined) {
    try {
      const incomes = await this.restCallSer.getIncomesByRange(start, end);
      if (!incomes) {
        throw new Error();
      }
      this.incomes = incomes;
      var chartInc = [];
      this.utSer.getIncomeCategories().forEach((category) => {
        let amt = 0;
        let label = null;

        this.incomes.forEach((inc) => {
          if (inc.category === category.label) {
            amt += inc.amount;
            label = inc.category;
          }
        });
        if (label === null) {
          return;
        }
        chartInc.push({
          category: label,
          amount: amt,
          color: this.utSer.getIncomeCategories().find(cat => cat.label === label).color
        });
      });
      console.log(chartInc);
      this.totalIncome = this.incomes.reduce((abc, cur) => {
        return abc + cur.amount;
      }, 0);
      console.log(this.totalIncome);
      this.createIncomeDoughnutChart(chartInc);
      console.log(this.incomes);
    } catch (error) {
      if (error.status === 404) {
        this.totalIncome = 0;
        this.incomes = []

      }
      console.warn(error);
      console.warn(error.status);
    }
  }

  createExpDoughnutChart(expenses: any) {
    var labels = [];
    var data = [];
    var colors = [];

    expenses.forEach((expense) => {
      labels.push(expense.category);
      data.push(expense.amount);
      colors.push(expense.color);
      // colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    });
    this.data = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        },
      ],
    };
  }
  createIncomeDoughnutChart(incomes: any) {
    var labels = [];
    var data = [];
    var colors = [];

    incomes.forEach((expense) => {
      labels.push(expense.category);
      data.push(expense.amount);
      colors.push(expense.color);
      // colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    });
    this.IncomeData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: colors,
          hoverBackgroundColor: colors,
        },
      ],
    };
  }

  go2Expense() {
    this.router.navigate(['../expense'], { relativeTo: this.route });
  }

  go2Income() {
    this.router.navigate(['../income'], { relativeTo: this.route });
  }

  getAllDetails() { }

  show() {
    this.ref = this.dialogService.open(ExpenseAndIncomeDetailsComponent, {
      header: 'Details',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        start: this.startDay,
        end: this.endDay
    },
    });

    this.ref.onClose.subscribe((product: Product) => {
      if (product) {
        this.messageService.add({
          severity: 'info',
          summary: 'Product Selected',
          detail: product.name,
        });
      }
    });
  }

  onTimeLineChange(event) {
    console.log(event)
    console.log(this.selectedTime)

  }

  selectedTimeLine() {
    console.log("Hello")
    if (this.selectedTime.code === 'monthly') {
      console.log(this.monthly)
      var y = this.monthly.getFullYear(), m = this.monthly.getMonth();
      this.startDay = new Date(y, m, 1);
      this.endDay = new Date(y, m + 1, 0);
      console.log(this.startDay)
      console.log(this.endDay)
      this.getAllExpenses(this.startDay, this.endDay)
      this.getAllIncomes(this.startDay, this.endDay)
    }
    if (this.selectedTime.code === 'yearly') {
      console.log(this.selectedYear)
      var y = this.selectedYear.getFullYear(), m = this.selectedYear.getMonth();
       this.startDay = new Date(y, m, 1);
       this.endDay = new Date(y, 11, 31);
       console.log(this.startDay)
       console.log(this.endDay)
       this.getAllExpenses(this.startDay, this.endDay)
       this.getAllIncomes(this.startDay, this.endDay)
    }
    if (this.selectedTime.code === 'period') {
      console.log(this.rangeDates)
      this.startDay = this.rangeDates[0]
      this.endDay = this.rangeDates[1]
      this.getAllExpenses(this.startDay, this.endDay)
      this.getAllIncomes(this.startDay, this.endDay)

    }

  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
