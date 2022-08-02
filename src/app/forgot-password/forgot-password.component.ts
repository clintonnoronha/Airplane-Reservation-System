import { Component, OnInit } from '@angular/core';
import { FormControl,Validators, FormGroup, AbstractControl } from '@angular/forms';
import { LoginService } from '../shared/login.service';
import { ForgotPasswordService } from '../shared/forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email, this.noSpaceAllowed]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
  }
    
  );

  constructor(private forgotPasswordService: ForgotPasswordService,
    private loginService: LoginService) {  }
 
  ngOnInit(): void {
  }

  forgotPassword() {
    let toForgotPassword= {
      email: this.form.value.emailId,
      password: this.form.value.password
    }

    this.forgotPasswordService.forgotPassword(toForgotPassword).subscribe(response=> {
      alert('Your password was reset! Kindly log in.')
      window.location.reload();
    });
  }

  noSpaceAllowed(control: FormControl) {
    if (control.value != null && control.value.indexOf(' ') != -1) {
      return { noSpaceAllowed: true };
    }
    return null;
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

      let toCheck = {
        email: this.form.value.emailId
      }

      this.loginService.check(toCheck).subscribe(res => {
        if (res.length != 0) {
          this.forgotPassword();
        } else {
          alert('User with Email ID: ' + this.form.value.emailId + " was not found!");
          return;
        }
      });
      
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
