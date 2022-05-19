import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';

export interface question {
  qst:string,
  res:string
}

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  userRegForm: FormGroup;
  isSubmitted  =  false;
  qst1:string = "What is your mother's maiden name?"
  qst2:string = "Your favorite sport?"
  questions: question[]  =[{"qst": this.qst1, "res": null,  }, {"qst": this.qst2, "res": null}]

  constructor(private router: Router, private formBuilder: FormBuilder, private http:HttpClient, private messageService: MessageService ) { }

  ngOnInit(): void {
    this.userRegForm  =  this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      age: ['', Validators.required],
      qst1: ['', Validators.required],
      qst2: ['', Validators.required],
  });
  }

  get formControls() { return this.userRegForm.controls; }

 async signup(){

  try {
    this.isSubmitted = true;
    if(this.userRegForm.invalid){
      return;
    }
  
    console.log(this.userRegForm.value);
    console.log(this.userRegForm.value.qst1);
    const {name, email, password, age, ...res} = this.userRegForm.value
    this.questions[0].res = res.qst1
    this.questions[1].res = res.qst2
    const userReg = {
      name,
      email,
      password,
      age,
      "questions": this.questions
    }
    console.log(userReg)
    const user = await this.http.post(environment.API_URL+'/users', userReg).toPromise()
    console.log(user)
    if(!user || !user.hasOwnProperty('user')){
      throw new Error('Something went wrong')
    }
    environment.token = user['token']
  
    this.messageService.add({
      severity: 'success',
      summary: 'Registered successfully',
      detail: 'You are redirected to Login page',
    });
    setTimeout(() => {
      this.router.navigate(['/login'])      
    }, 3000);
    
  } catch (error) {
    console.log(error)
    if(error.error.hasOwnProperty('keyPattern')){
     return  this.messageService.add({
        severity: 'error',
        summary: 'Registration failed',
        detail: `Email ${error.error.keyValue.email} is already registered, please use a different email.`,
        life: 5000
      });
    }
    this.messageService.add({
      severity: 'error',
      summary: 'Registration failed',
      detail: 'Please try again',
    });
    
  }
   
    // this.router.navigateByUrl('/admin');
  }

}
