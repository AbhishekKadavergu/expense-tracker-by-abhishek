import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { IncomesComponent } from '../user/incomes/incomes.component';
import { ExpensesComponent } from '../user/expenses/expenses.component';
import { DashboardComponent } from '../user/dashboard/dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { ChangePasswordComponent } from '../user/change-password/change-password.component';

import { SharedModule } from '../shared-module/shared-module.module';

import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AuthInterceptorService } from '../services/auth-interceptor.service';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    IncomesComponent,
    ExpensesComponent,
    DashboardComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FileUploadModule,
    CalendarModule,
    DropdownModule,
    TabMenuModule,
    DynamicDialogModule,
    OverlayPanelModule,
    DialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    ContextMenuModule,
    ProgressSpinnerModule,
    CardModule,
    TabMenuModule,
    DynamicDialogModule,
    OverlayPanelModule,
    DialogModule,
    TooltipModule,
    StepsModule,
    ToastModule,
    MessagesModule,
    MessageModule,
  ],
  providers: [
    MessageService,
    DialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class HomeModule {}
