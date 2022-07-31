import { Component, OnInit } from '@angular/core';
import { FormControl,Validators, FormGroup } from '@angular/forms';
import { ForgotPasswordService } from '../shared/forgot-password.service';

// import {​​​​​​ ConfirmedValidator }​​​​​​ from './confirmed.validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword:new FormControl('', [Validators.required, Validators.minLength(8)])
  }
    
  );

  constructor(private forgotPasswordService: ForgotPasswordService) { }
 
  ngOnInit(): void {
  }

  forgotPassword() {
    let toForgotPassword= {
      email: this.form.value.emailId,
      password: this.form.value.password
    }

    this.forgotPasswordService.forgotPassword(toForgotPassword).subscribe(response=> {
      window.location.reload();
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  onSubmit(){
      if(this.form.value.password != this.form.value.confirmPassword)
      {
          alert('Password Mismatch!!');
          return;
      }
      this.forgotPassword();
  }


  onClear(){
      this.form.reset();
      this.form.setValue({
        emailId: '',
        password:'',
        confirmPassword:''
      });
  }
}
