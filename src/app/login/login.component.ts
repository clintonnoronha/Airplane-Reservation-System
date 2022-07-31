import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

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

  constructor(private dialog: MatDialog, private loginDialog: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
    
  }

  onSubmit() {
    
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
