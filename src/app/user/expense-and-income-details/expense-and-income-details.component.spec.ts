import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';

import { ExpenseAndIncomeDetailsComponent } from './expense-and-income-details.component';

describe('ExpenseAndIncomeDetailsComponent', () => {
  let component: ExpenseAndIncomeDetailsComponent;
  let fixture: ComponentFixture<ExpenseAndIncomeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseAndIncomeDetailsComponent],
      providers: [DynamicDialogRef, DynamicDialogConfig],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseAndIncomeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
