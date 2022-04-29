import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

//PrimeNG modules
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DialogModule} from 'primeng/dialog';
import {TooltipModule} from 'primeng/tooltip';
import {FileUploadModule} from 'primeng/fileupload';
import {StepsModule} from 'primeng/steps';






import { ChartModule } from 'primeng/chart';

//Services
import { MessageService } from 'primeng/api';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ExpensesComponent } from './user/expenses/expenses.component';
import { IncomesComponent } from './user/incomes/incomes.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductListDemo } from './user/dashboard/productlistdemo';
import { ProductService } from './user/dashboard/productservice';
import { ExpenseAndIncomeDetailsComponent } from './user/expense-and-income-details/expense-and-income-details.component';
import { ChangePasswordComponent } from './user/change-password/change-password.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserRegistrationComponent,
    DashboardComponent,
    ExpensesComponent,
    IncomesComponent,
    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent,
    ProductListDemo,
    ExpenseAndIncomeDetailsComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ChartModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    CalendarModule,
    ContextMenuModule,
    DropdownModule,
    ToastModule,
    InputTextModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule,
    CardModule,
    TabMenuModule,
    DynamicDialogModule,
    OverlayPanelModule,
    DialogModule,
    TooltipModule,
    FileUploadModule,
    StepsModule    
  ],
  providers: [MessageService, DialogService, ProductService,     {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
   },],
  bootstrap: [AppComponent],
  entryComponents: [ProductListDemo],
})
export class AppModule {}
