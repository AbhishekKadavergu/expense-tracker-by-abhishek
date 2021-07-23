import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  userRegForm: FormGroup;
  isSubmitted  =  false;

  constructor(private router: Router, private formBuilder: FormBuilder, private http:HttpClient ) { }

  ngOnInit(): void {
    this.userRegForm  =  this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      age: ['', Validators.required],
  });
  }

  get formControls() { return this.userRegForm.controls; }

 async login(){
    console.log(this.userRegForm.value);
    this.isSubmitted = true;
    if(this.userRegForm.invalid){
      return;
    }

    console.log(this.userRegForm.value);
    const user = await this.http.post(environment.API_URL+'/users', this.userRegForm.value).toPromise()
    console.log(user)
    if(!user){
      return console.error("Something went wrong")
    }
    environment.token = user['token']
    environment.userName = user['name']
    this.router.navigate(['/dashboard'])
    // this.router.navigateByUrl('/admin');
  }

}
