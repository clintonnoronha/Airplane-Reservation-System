import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../shared/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  constructor(private service: RegisterService) { }

  ngOnInit(): void {
  }

  onSubmit() {

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