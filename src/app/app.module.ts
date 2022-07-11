import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

//PrimeNG modules
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ContextMenuModule } from 'primeng/contextmenu';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { TabMenuModule } from 'primeng/tabmenu';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { StepsModule } from 'primeng/steps';

//Services
import { MessageService } from 'primeng/api';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserRegistrationComponent } from './user/user-registration/user-registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductListDemo } from './user/dashboard/productlistdemo';
import { ProductService } from './user/dashboard/productservice';
import { ExpenseAndIncomeDetailsComponent } from './user/expense-and-income-details/expense-and-income-details.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ForgotPasswordComponent } from './user/forgot-password/forgot-password.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared-module/shared-module.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserRegistrationComponent,
    PageNotFoundComponent,
    ProductListDemo,
    ExpenseAndIncomeDetailsComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CommonModule,
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
  ],
  providers: [
    MessageService,
    DialogService,
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [ProductListDemo],
})
export class AppModule {}
