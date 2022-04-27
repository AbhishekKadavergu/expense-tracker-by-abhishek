import { Injectable } from '@angular/core';
import { Categories } from '../user/expenses/expenseCategories';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  getExpCategories(): Categories[]{
    const CATEGORIES = [
      { label: 'Life Style', value: 'Life Style', color: "#2ab7ca" },
      { label: 'Communication', value: 'Communication', color: "#dcedc1" },
      { label: 'Debts', value: 'Debts', color: "#eec9d2" },
      { label: 'Education', value: 'Education', color: "#f6abb6" },
      { label: 'EMI', value: 'EMI', color: "#011f4b" },
      { label: 'Gifts', value: 'Gifts', color: "#03396c" },
      { label: 'Groceries', value: 'Groceries', color: "#6497b1" },
      { label: 'Health', value: 'Health', color: "#b3cde0" },
      { label: 'Home & Utilities', value: 'Home & Utilities', color: "#451e3e" },
      { label: 'Hotel', value: 'Hotel', color: "#851e3e" },
      { label: 'Miscellaneous', value: 'Miscellaneous', color: "#dec3c3" },
      { label: 'Pets', value: 'Pets', color: "#4a4e4d" },
      { label: 'Sports', value: 'Sports', color: "#3da4ab" },
      { label: 'Transportation', value: 'Transportation', color: "#f6cd61" },
      { label: 'Others', value: 'Others', color: "#fe8a71" },
    ];
    return CATEGORIES
  }

  getIncomeCategories(): Categories[]{
    const CATEGORIES = [
      { label: 'Salary income', value: 'Salary income', color: '#3b7dd8' },
      { label: 'Profits income', value: 'Profits income', color: "#64a1f4" },
      { label: 'Interest income', value: 'Interest income', color: "#00a0b0"  },
      { label: 'Dividend income', value: 'Dividend income', color: "#edc951" },
      { label: 'Rental income', value: 'Rental income', color: "#29a8ab" },
      { label: 'Capital Gains', value: 'Capital Gains', color: "#ff99cc" },
      { label: 'Royalty income', value: 'Royalty income', color: "#ff5588" },
      { label: 'Miscellaneous', value: 'Miscellaneous', color: "#76b4bd" },
      { label: 'Others', value: 'Others', color: "#58668b" },
    ];
    return CATEGORIES

  }

  getAuthToken():any {
    return localStorage.getItem('token') 
    }
}
