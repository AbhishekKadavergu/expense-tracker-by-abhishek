import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    TableModule,
  ],
  exports: [
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    TableModule,
  ],
})
export class SharedModule {}
