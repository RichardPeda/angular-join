import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { passwordMatchValidator } from '../shared/passwordValid.directive';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, MatCheckboxModule, FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  checkbox: boolean = false;
  newUserForm: FormGroup;

  constructor() {
    this.newUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password_1: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      password_2: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)])
    }, { validators: passwordMatchValidator });
  }
  // , { validators: passwordMatchValidator }
  onSubmit() {
    for (let el in this.newUserForm.controls) {
      if (this.newUserForm.controls[el].errors) {
        console.log(el)
      }
    }
    console.log('submit');
    console.log(this.newUserForm.valid);

  }

}
