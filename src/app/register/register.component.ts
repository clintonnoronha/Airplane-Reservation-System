import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RegisterService } from '../shared/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  maxDate=new Date();
  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    dob: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    title: new FormControl(1, Validators.required)
  });

  titles = [
    { id: 1, value: 'Mr.'},
    { id: 2, value: 'Ms.'},
    { id: 3, value: 'Mrs.'}
  ]

  message: string='';
  registered=false;
  constructor(private service: RegisterService,
    private registerDialogue: MatDialogRef<RegisterComponent>) { }

  ngOnInit(): void {
  }

  onRegister(){
    let date = new Date(this.form.value.dob);

    console.log(date.toLocaleDateString());
    let title= this.titles.filter( t=> t.id== this.form.value.title);
    console.log(title,"     ", this.form.value.title);
    let toRegister ={
       fname: this.form.value.firstName,
       lname: this.form.value.lastName,
       email: this.form.value.email,
       pswd: this.form.value.password,
       dob: date.toLocaleDateString(),
       phone_number: this.form.value.phoneNumber,
       title: title[0].value
    }
    this.service.register(toRegister).subscribe((response)=> {
        this.onClear();
    });
    this.registered=true;
  }

  onSubmit() {
    this.onRegister();
      if (this.registered) {
        this.message= 'User registered Successfully! Please Sign In.';
        alert(this.message);
      }
      this.registered=false;
  }

  onClear() {
    this.form.reset();
    this.form.setValue({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dob: '',
      phoneNumber: '',
      title: 1
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

}