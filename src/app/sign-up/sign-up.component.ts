import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { passwordMatchValidator } from '../shared/passwordValid.directive';
import { Router, RouterModule } from '@angular/router';
import { UserdataService } from '../services/userdata.service';
import { User } from '../interfaces/user.interface';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, MatCheckboxModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  checkbox: boolean = false;
  newUserForm: FormGroup;
  user: User = { name: '', email: '', password: '',contacts:[], tasks : [] }

  constructor(private userService: UserdataService, private router: Router) {
    this.newUserForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password_1: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]),
      password_2: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(10)])
    }, { validators: passwordMatchValidator });
  }

  async onSubmit() {
    this.user.name = this.newUserForm.get('name')?.value;
    this.user.email = this.newUserForm.get('email')?.value;
    this.user.password = this.newUserForm.get('password_1')?.value;
    await this.userService.addUser(this.user);
    this.clearForm();
    this.router.navigate(['']);
  }

  clearForm() {
    this.newUserForm.patchValue({
      name: '', email: '', password_1: '', password_2: ''
    });
    this.newUserForm.markAsPristine();
    this.newUserForm.markAsUntouched();
    this.checkbox = false;
  }



}
