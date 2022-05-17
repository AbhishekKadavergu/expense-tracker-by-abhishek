import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { RestCallsService } from '../services/rest-calls.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private messageService: MessageService,
    private restCallSer: RestCallsService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  async login() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    try {
      this.isLoading = true;
      const user = await this.restCallSer.login(this.loginForm.value);
      if (!user) {
        throw new Error();
      }
      console.log(user);
      this.isLoading = false;
      environment.token = user['token'];
      environment.userName = user['user'].name;
      environment.email = user['user'].email;
      environment.userId = user['user']._id;
      localStorage.setItem('token', user['token'])

      this.router.navigate(['/home']);
    } catch (error) {
      this.isLoading = false;
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: error.error.error,
      });
      console.warn(error);
    }
    // this.router.navigateByUrl('/admin');
  }

  forgotPassword(){
    this.router.navigateByUrl('fpwd')
  }
}
