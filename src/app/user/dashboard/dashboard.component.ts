import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductListDemo } from './productlistdemo';
// import { Product } from './product';

import { RestCallsService } from 'src/app/services/rest-calls.service';
import { Product } from './product';
import { ExpenseAndIncomeDetailsComponent } from '../expense-and-income-details/expense-and-income-details.component';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DialogService, MessageService],
})
export class DashboardComponent implements OnInit {
  expenses: any;
  incomes: any;
  data: any;
  IncomeData: any;
  currentMonthYear: any;
  totalExpense: number;
  totalIncome: number;
  ref: DynamicDialogRef;

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

    this.currentMonthYear = m_names[m] + ', ' + y;
  }

  ngOnInit(): void {
    this.getAllExpenses();
    this.getAllIncomes();
  }

  async getAllExpenses() {
    try {
      const expenses = await this.restCallSer.getExpensesByRange();
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
          color: this.utSer.getExpCategories().find(cat=> cat.label===label).color
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
        this.totalExpense = 0;
      }
      console.warn(error);
      console.warn(error.status);
    }
  }

  async getAllIncomes() {
    try {
      const incomes = await this.restCallSer.getIncomesByRange();
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
          color: this.utSer.getIncomeCategories().find(cat=> cat.label===label).color          
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

  getAllDetails() {}

  show() {
    this.ref = this.dialogService.open(ExpenseAndIncomeDetailsComponent, {
      header: 'Details',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
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

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
