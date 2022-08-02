import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LocalService } from '../local.service';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  message: string='';
  loginFailed= false;
  check=-1;

  constructor(private dialog: MatDialog,
    private loginDialog: MatDialogRef<LoginComponent>, 
    private loginService: LoginService,
    private localStore: LocalService) { }

  ngOnInit(): void {
    
  }

  createLogin() {
    let toLogin = {
      email: this.form.value.emailId,
      password: this.form.value.password
    }

    this.loginService.login(toLogin).subscribe(response => {
      if(response.length!=0) {
          // console.log(response);
          this.loginFailed=false;
          this.check =1;
          this.localStore.saveData('user_id', String(response[0].id));
          this.localStore.saveData('role', String(response[0].role));

          this.loginDialog.close();
          window.location.reload();

      }
      else {
        this.check=0;
      }
      
    });
  }

  onSubmit() {
    this.createLogin();
    if(this.check===0) {
      this.loginFailed= true;
      this.message="Invalid email/password.";

    }
    
  }

  onClear() {
    this.form.reset();
    this.form.setValue({
      emailId: '',
      password: ''
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  openForgotPasswordDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.loginDialog.close();
    this.dialog.open(ForgotPasswordComponent, dialogConfig);
  }

}
