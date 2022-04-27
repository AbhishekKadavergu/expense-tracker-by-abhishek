import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RestCallsService } from 'src/app/services/rest-calls.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email:string
  question:string = null
  response:string = null
  questionId:string = null
  password:string = null
  cPassword:string = null


  constructor(private rs: RestCallsService, private messageSer: MessageService, private router: Router) { }

  ngOnInit(): void {
  }

  async getQuestions(){
    const user ={
      "email": this.email
    }
    try {
      const questions = await this.rs.getUserQuestion(user)  
      if(!questions){
        throw new Error()
      }  
      this.question = questions['question']['qst']  
      this.questionId = questions['question']['_id']  
      this.email = questions['email']  
    } catch (error) {
      console.log(error)
      
    }
  }

  async setNewPassword(){
    try {
      const questionObj = {
        "email": this.email,
        "cpassword": this.cPassword,
        "question": {
          "_id": this.questionId,
          "res": this.response
        }
      }
      const USER = await this.rs.setNewPassword(questionObj)
      if(!USER){
        throw new Error()
      }
      this.messageSer.add({severity:'success', summary:'Success', detail:'Please login with new credentials, you will be redirected to login page!', life: 5000});
      setTimeout(() => {
        this.router.navigateByUrl('login')        
      }, 6000);
      
    } catch (error) {
      this.messageSer.add({severity:'error', summary:'Failed', detail:'Invalid response to the question', life: 5000});
      
    }
  }


}
