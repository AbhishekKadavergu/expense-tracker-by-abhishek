import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { RestCallsService } from '../services/rest-calls.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName: string;
  items: MenuItem[];
  activeItem: MenuItem;

  constructor(
    private router: Router,
    private restCallSer: RestCallsService,
    private route: ActivatedRoute
  ) {
    this.userName = environment.userName;
  }

  ngOnInit(): void {
    console.log(this.userName);
    console.log(environment.userName);
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', id: 'dashboard' },
      { label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', id: 'dashboard' },
      { label: 'Expenses', icon: 'pi pi-fw pi-minus', id: 'expense' },
      { label: 'Incomes', icon: 'pi pi-fw pi-plus', id: 'income' },
      // { label: 'Settings', icon: 'pi pi-fw pi-cog', id: 'home' },
    ];
    this.activeItem = this.items[1];
  }

  toExpenses(Events: any) {
    console.log(Events);
    this.router.navigate(['expense'], { relativeTo: this.route });
  }

  toIncomes(Events: any) {
    console.log(Events);
    this.router.navigate(['income'], { relativeTo: this.route });
  }

  async signOut() {
    try {
      const res = await this.restCallSer.logOut();
      this.router.navigate(['login']);
    } catch (error) {
      console.log(error);
    }
  }

  activateMenu(tab) {
    console.log(tab);
    console.log(tab.activeItem);
    this.router.navigate([tab.activeItem.id], { relativeTo: this.route });
  }
}
