import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [FooterComponent, FormsModule, ReactiveFormsModule, ToastModule],
})
export class SharedModule {}
