import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { MessageService } from 'primeng/api';
import { RestCallsService } from 'src/app/services/rest-calls.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  bioSection: FormGroup



  constructor(private fb: FormBuilder, private rs: RestCallsService, private messageSer: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm(){
    this.bioSection = this.fb.group({
      curent_password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
      passwords: this.fb.group({
        new_password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
        confirm_password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
      }, { validators: this.passwordConfirming }),
    });

  }

  get curent_password() {
    return this.bioSection.get('curent_password')
  }
  get new_password() {
    return this.bioSection.get('passwords.new_password')
  }
  get confirm_password() {
    return this.bioSection.get('passwords.confirm_password')
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('new_password').value !== c.get('confirm_password').value) {
      return { invalid: true };
    }
  }

  async changePassword() {
    console.log(this.bioSection.value);
    const passwords = {
      "curent_password": this.curent_password.value,
      "new_password": this.new_password.value,
      "confirm_password": this.confirm_password.value
    }
    try {
      const message = await this.rs.changePassword(passwords)
      if (!message.hasOwnProperty('success')) {
        throw new Error('Failed')
      }
      this.messageSer.add({ severity: 'success', summary: 'Success', detail: 'Password changed successfully. To continue please login with new password.', life: 5000 });
      console.log(message)
      this.router.navigateByUrl('login')


    } catch (error) {
      console.log(error.error.error)
      this.messageSer.add({ severity: 'error', summary: 'Error', detail: error.error.error, life: 5000 });

    }
  }

}
