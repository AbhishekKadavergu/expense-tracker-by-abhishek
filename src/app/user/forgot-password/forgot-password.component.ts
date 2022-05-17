import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { RestCallsService } from 'src/app/services/rest-calls.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email:string = null
  question:string = null
  // response:string = null
  questionId:string = null
  password:string = null
  cPassword:string = null

  submitted:boolean = false
  
  setPwdForm: FormGroup
  items:MenuItem[]
  step = 0


  constructor(private rs: RestCallsService, private messageSer: MessageService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.setPasswordForm()
    this.items = [
      {label: 'Email'},
      {label: 'Question & Password'},
      {label: 'Login'}
  ];
  }

  setPasswordForm(){
    this.setPwdForm = this.fb.group({
      response: ['', [Validators.required, Validators.pattern('^([a-zA-Z]+\\s)*[a-zA-Z]+$')]],
      passwords: this.fb.group({
        new_pwd: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
        con_new_pwd: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
      }, {validators: this.passwordConfirming})
    })
  }

  get response(){
    return this.setPwdForm.get('response')
  }

  get new_pwd(){
    return this.setPwdForm.get('passwords.new_pwd')
  }

  get con_new_pwd(){
    return this.setPwdForm.get('passwords.con_new_pwd')
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('new_pwd').value !== c.get('con_new_pwd').value) {
      return { invalid: true };
    }
  }

  async getQuestions(email, item){
    const user ={
      "email": email.user_email
    }
    try {
      const questions = await this.rs.getUserQuestion(user)  
      if(!questions){
        throw new Error()
      }  
      this.question = questions['question']['qst']  
      this.questionId = questions['question']['_id']  
      this.email = questions['email']  
      this.submitted = true
      this.onNext(item)
    } catch (error) {
      this.messageSer.add({severity:'error', summary:'Error', detail:error.error.error, life: 5000});

      console.log(error.error.error)
      
    }
  }

  async setNewPassword(item:any){
    try {
      const questionObj = {
        "email": this.email,
        "cpassword": this.setPwdForm.value.passwords.con_new_pwd,
        "question": {
          "_id": this.questionId,
          "res": this.setPwdForm.value.response
        }
      }
      const USER = await this.rs.setNewPassword(questionObj)
      if(!USER){
        throw new Error()
      }
      this.messageSer.add({severity:'success', summary:'Success', detail:'A new password has been set', life: 5000});
      this.onNext(item)
      // setTimeout(() => {
      //   this.router.navigateByUrl('login')        
      // }, 6000);
      
    } catch (error) {
      this.messageSer.add({severity:'error', summary:'Failed', detail:'Invalid response to the question', life: 5000});
      
    }
  }

  onNext(item){
    console.log(item)
    if(item['activeIndex']>=2){
      this.step = 0
    }else{
      this.step = item['activeIndex']+1
    }
  }

  login(){
    this.router.navigateByUrl("login")
  }

  // onResponseAndPwdSubmit(){
  //   console.log(this.setPwdForm)

  // }

 


}
