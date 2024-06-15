import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { passwordMatchValidator } from '../shared/passwordValid.directive';
import { Router, RouterModule } from '@angular/router';
import { UserdataService } from '../services/userdata.service';
import { User } from '../interfaces/user.interface';
import { Guest } from '../shared/models/guestUser.model';
import { addDoc, collection, query, where } from '@angular/fire/firestore';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    CommonModule,
    RouterModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  checkbox: boolean = false;
  newUserForm: FormGroup;
  user: User = { name: '', email: '', password: '', contacts: [], tasks: [] };

  constructor(private userService: UserdataService, private router: Router) {
    this.newUserForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password_1: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ]),
        password_2: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(10),
        ]),
      },
      { validators: passwordMatchValidator }
    );
  }

  async onSubmit() {
    let name = this.newUserForm.get('name')?.value;
    let email = this.newUserForm.get('email')?.value;
    let password = this.newUserForm.get('password_1')?.value;
    await this.addNewUser(name, email, password);
    this.clearForm();
    this.router.navigate(['']);
  }

  async addNewUser(name: string, email: string, pw: string) {
    let guest = new Guest();
    guest.name = name;
    guest.email = email;
    guest.password = pw;

    if (await this.userService.checkIfUserExists(name, email)) {
      const docRef = await addDoc(
        this.userService.getUserRef(),
        guest.toJSON()
      );
    } else {
      console.log('user already exists');
    }
  }

  clearForm() {
    this.newUserForm.patchValue({
      name: '',
      email: '',
      password_1: '',
      password_2: '',
    });
    this.newUserForm.markAsPristine();
    this.newUserForm.markAsUntouched();
    this.checkbox = false;
  }
}
