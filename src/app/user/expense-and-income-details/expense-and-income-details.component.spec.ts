import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseAndIncomeDetailsComponent } from './expense-and-income-details.component';

describe('ExpenseAndIncomeDetailsComponent', () => {
  let component: ExpenseAndIncomeDetailsComponent;
  let fixture: ComponentFixture<ExpenseAndIncomeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseAndIncomeDetailsComponent ]
    })
    .compileComponents();
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
